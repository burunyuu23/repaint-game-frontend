export type RequestParam = {
    offset?: number,
    limit?: number,
    sort?: string,
}

export type Page<T> = {
    content:          T[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export type Pageable = {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    unpaged:    boolean;
}

export type Sort = {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
