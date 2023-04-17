# gRPC

## gRPC and Protocol Buffers

> [gRPC Introduction - YouTube](https://www.youtube.com/watch?v=XRXTsQwyZSU&ab_channel=StephaneMaarek)

Today's trend is to build **microservices**. These microservices must exchange information and need to agree on:

- The API to exchange data
- The data format
- The error patterns
- Load Balancing
- Many other...

One of the popular choice for building API is **REST** (HTTP-JSON).

What's **RPC**?

An RPC is a Remote Procedure Call.

In your CLIENT code, it looks like you're just **calling a function** directly on the SERVER.

What's **gRPC**?

gRPC is a free and open-source framework developed by Google. At a high level, it allows you to define REQUEST and RESPONSE for RPC (Remote Procedure Calls) and handles all the rest for you.

At the core of gRPC, you need to define the messages and services using **Protocol Buffers**. The rest of the gRPC code will be generated for you and you'll have to provide an implementation for it.

Protocol Buffers is the cornerstone of gRPC.

## A Evolution of data

- Comma Seperated Values (CSV)
- Relational tables
- JSON
- Protocol Buffers

## FlatBuffers

[FlatBuffers](https://google.github.io/flatbuffers/) is an efficient cross platform serialization library.

性能：[C++ Benchmarks](https://google.github.io/flatbuffers/flatbuffers_benchmarks.html)，最初用于游戏等对性能和实时性要求极高的领域。

## PB 安装

[The Need for Protocol Buffers - YouTube](https://www.youtube.com/watch?v=BywIOD_Y3CE&ab_channel=StephaneMaarek)

安装编译器：<https://github.com/protocolbuffers/protobuf>

> For non-C++ users, the simplest way to install the protocol compiler is to download a pre-built binary from our release page:
>
> <https://github.com/protocolbuffers/protobuf/releases>

安装 Dart plugin for the protoc compiler：<https://github.com/google/protobuf.dart/tree/master/protoc_plugin>
