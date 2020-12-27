export const paginator = async (
  model: any,
  page: number,
  itemsPerPage: number,
): Promise<PaginatorResult> => {
  const result = new PaginatorResult();
  const itemsToSkip = itemsPerPage * page;
  result.total = await model.countDocuments();

  result.currentPage = page;
  result.data = await model
    .find({})
    .limit(itemsPerPage)
    .skip(itemsToSkip)
    .sort({ userName: 'asc' });

  result.totalPages = Math.ceil(result.total / itemsPerPage);
  result.pageSize = itemsPerPage;
  result.nextPage =
    result.currentPage + 1 > result.totalPages
      ? result.totalPages
      : result.currentPage + 1;

  result.previousPage = result.currentPage - 1 < 0 ? 0 : result.currentPage;

  return result;
};

export class PaginatorResult {
  data: any[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  total: number;
}
