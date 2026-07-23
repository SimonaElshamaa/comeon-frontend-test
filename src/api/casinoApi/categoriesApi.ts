import { request } from "../client";
import type { Category } from "../../types/category";

export function getCategories(): Promise<Category[]> {
  return request<Category[]>("/categories", {
    method: "GET",
  });
}