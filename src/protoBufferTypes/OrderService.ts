// Original file: src/protos/order-service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateOrderRequest as _CreateOrderRequest, CreateOrderRequest__Output as _CreateOrderRequest__Output } from './CreateOrderRequest';
import type { CreateOrderResponse as _CreateOrderResponse, CreateOrderResponse__Output as _CreateOrderResponse__Output } from './CreateOrderResponse';
import type { GetOrderRequest as _GetOrderRequest, GetOrderRequest__Output as _GetOrderRequest__Output } from './GetOrderRequest';
import type { GetOrderResponse as _GetOrderResponse, GetOrderResponse__Output as _GetOrderResponse__Output } from './GetOrderResponse';

export interface OrderServiceClient extends grpc.Client {
  CreateOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _CreateOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  CreateOrder(argument: _CreateOrderRequest, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _CreateOrderRequest, callback: grpc.requestCallback<_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  
  GetOrder(argument: _GetOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  GetOrder(argument: _GetOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  GetOrder(argument: _GetOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  GetOrder(argument: _GetOrderRequest, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _GetOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _GetOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _GetOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _GetOrderRequest, callback: grpc.requestCallback<_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface OrderServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateOrder: grpc.handleUnaryCall<_CreateOrderRequest__Output, _CreateOrderResponse>;
  
  GetOrder: grpc.handleUnaryCall<_GetOrderRequest__Output, _GetOrderResponse>;
  
}

export interface OrderServiceDefinition extends grpc.ServiceDefinition {
  CreateOrder: MethodDefinition<_CreateOrderRequest, _CreateOrderResponse, _CreateOrderRequest__Output, _CreateOrderResponse__Output>
  GetOrder: MethodDefinition<_GetOrderRequest, _GetOrderResponse, _GetOrderRequest__Output, _GetOrderResponse__Output>
}
