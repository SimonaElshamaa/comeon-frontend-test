import { request } from "../client";
import type { Category } from "../../types/category";

export function getCategories() {
  return request<Category[]>("/categories");
}

export function getGamesByCategory(categoryId: string) {
  return request(`/games?category=${categoryId}`);
}