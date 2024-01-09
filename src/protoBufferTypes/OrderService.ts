// Original file: src/protos/order-service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateOrderRequest as _CreateOrderRequest, CreateOrderRequest__Output as _CreateOrderRequest__Output } from './CreateOrderRequest';
import type { CreateOrderResponse as _CreateOrderResponse, CreateOrderResponse__Output as _CreateOrderResponse__Output } from './CreateOrderResponse';

export interface OrderServiceClient extends grpc.Client {
  CreateOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _CreateOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _CreateOrderRequest, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface OrderServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateOrder: grpc.handleUnaryCall<_CreateOrderRequest__Output, _CreateOrderResponse>;
  
}

export interface OrderServiceDefinition extends grpc.ServiceDefinition {
  CreateOrder: MethodDefinition<_CreateOrderRequest, _CreateOrderResponse, _CreateOrderRequest__Output, _CreateOrderResponse__Output>
}
