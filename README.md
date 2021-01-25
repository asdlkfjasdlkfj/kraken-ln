# Lightning graph explorer for Kraken

The following is a proof-of-concept searchable table interface for a lightning network channel graph. Each table item represents an edge, and edges are searchable by node alias or node pubkey. 

# Build & Run

The project can be built and invoked with [`docker`](#docker) or [`node`]() .

## `docker`

### Build

```
docker build -t kraken-ln .
```

### Launch

```
docker run -p 3000:3000 kraken-ln
```

## `node`

### Build

```
npm install
npm run build
```

### Launch

```
npm run start
```