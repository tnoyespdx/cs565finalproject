FROM rust:buster as builder

WORKDIR /app
RUN USER=root cargo new --bin microservice
WORKDIR /app/microservice
COPY Cargo.toml Cargo.lock ./src/

WORKDIR /app/microservice
RUN cargo build

COPY ./ ./
RUN cargo build

FROM debian:stable-slim

WORKDIR /app

COPY --from=builder /app/microservice/target/debug/microservice ./

CMD ["/app/microservice"]