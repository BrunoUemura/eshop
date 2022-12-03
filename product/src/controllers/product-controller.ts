import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const productRepository = prisma.product;

export const getAllProducts = async (
  _request: Request,
  response: Response
): Promise<Response> => {
  const result = await productRepository.findMany();
  return response.send(result);
};

export const getProductById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const result = await productRepository.findFirst({
    where: { id: Number(id) },
  });
  return response.send(result);
};

export const createProduct = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { name, price, quantity, category, image_url } = request.body;
  const result = await productRepository.create({
    data: { name, price, quantity, category, image_url },
  });
  return response.status(201).send(result);
};

export const updateProduct = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const { name, price, quantity, category, image_url } = request.body;
  const result = await productRepository.update({
    where: { id: Number(id) },
    data: { name, price, quantity, category, image_url },
  });
  return response.send(result);
};

export const deleteProduct = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const result = await productRepository.delete({
    where: { id: Number(id) },
  });
  return response.send(result);
};
