import React, { useEffect, useState, useMemo, useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { DocumentStore } from "elasticlunr";

import {
  GraphResourceContext,
  GraphResourceResponse,
} from "../context/GraphResource";
import { buildSearchIndex, SearchDocument } from "../ln/Indexer";
import { hexToRgb } from "../util";

import {
  PageContainer,
  SubHeader,
  PaginationButton,
  Table,
  TableRow,
  TableColumn,
  TableHeader,
  TextInput,
  Mono,
  Label,
} from ".";

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

const getNodeLabelBackgroundColor = (hex: string) => {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.2)`;
};

const EdgeNodeLabel: React.FunctionComponent<
  { color: string; alias: string } & React.HTMLAttributes<HTMLSpanElement>
> = ({ color, alias, ...props }) => (
  <Label
    {...props}
    style={{
      backgroundColor: getNodeLabelBackgroundColor(color),
    }}
    title={`Query for ${alias}`}
  >
    {alias}
  </Label>
);

type Props = {
  pageLength?: number;
};

export const EdgeExplorer = React.memo<Props>(({ pageLength = 30 }) => {
  const [graphData, setGraphData] = useState<GraphResourceResponse>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const graphResource = useContext(GraphResourceContext);

  const searchIndex = useMemo(
    () => buildSearchIndex(graphData ? graphData : { nodes: [], edges: [] }),
    [graphData]
  );

  useEffect(() => {
    graphResource().then(setGraphData);
  }, []);

  const results = useMemo(
    () =>
      query
        ? searchIndex
            .search(query, { expand: true })
            .map((e) => searchIndex.documentStore.getDoc(e.ref))
        : Object.values(
            (searchIndex.documentStore as DocumentStore<SearchDocument> & {
              docs: SearchDocument[];
            }).docs
          ),
    [query, searchIndex]
  );

  useEffect(() => {
    setPage(0);
  }, [query, searchIndex]);

  const maxPages = Math.ceil(results.length / pageLength) - 1;

  const onNextPage = () => setPage((p) => (p + 1 <= maxPages ? p + 1 : p));
  const onPrevPage = () => setPage((p) => (p - 1 >= 0 ? p - 1 : p));
  const isLoading = graphData === undefined;

  const pagedResults = results.slice(
    page * pageLength,
    (page + 1) * pageLength
  );

  return (
    <>
      <SubHeader>
        <TextInput
          style={{ width: 350 }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="Search by node pubkey or alias"
        />
      </SubHeader>

      <br />

      <PageContainer>
        <HeaderSection>
          <h1>Edge Explorer</h1>
          {pagedResults.length !== 0 && (
            <Mono fontSize={12}>
              showing edges {(page * pageLength + 1).toLocaleString()} —{" "}
              {(page * pageLength + pagedResults.length).toLocaleString()} of{" "}
              {results.length.toLocaleString()}
            </Mono>
          )}
        </HeaderSection>

        {isLoading ? (
          <Mono fontSize={12}>Fetching graph data...</Mono>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Node 1</TableHeader>
                <TableHeader>Node 2</TableHeader>
                <TableHeader>Last Update</TableHeader>
              </tr>
            </thead>
            <tbody>
              {pagedResults.length ? (
                pagedResults.map((edge) => (
                  <TableRow key={edge.channel_id}>
                    <TableColumn>
                      <EdgeNodeLabel
                        alias={edge.node1_alias}
                        color={edge.node1_color}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuery(edge.node1_alias);
                        }}
                      />
                    </TableColumn>
                    <TableColumn>
                      <EdgeNodeLabel
                        alias={edge.node2_alias}
                        color={edge.node2_color}
                        onClick={() => {
                          setQuery(edge.node2_alias);
                        }}
                      />
                    </TableColumn>
                    <TableColumn>
                      {moment.unix(edge.last_update).fromNow()}
                    </TableColumn>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableColumn colSpan={3}>No results</TableColumn>
                </TableRow>
              )}
            </tbody>
          </Table>
        )}

        {pagedResults.length !== 0 && (
          <>
            <br />
            <div>
              <PaginationButton onClick={onPrevPage} disabled={page - 1 < 0}>
                Prev
              </PaginationButton>
              <PaginationButton
                onClick={onNextPage}
                disabled={page + 1 > maxPages}
              >
                Next
              </PaginationButton>
            </div>
          </>
        )}
      </PageContainer>
      <br />
    </>
  );
});

export default EdgeExplorer;
