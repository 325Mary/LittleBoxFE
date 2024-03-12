export class Paginate {

    constructor(
      private totalItems: number,
      private currentPages: number,
      private pageSize: number,
      private maxVisiblePages: number = 5,
    ) {}
  
    // Calcular el número total de páginas
    get totalPages(): number {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  
    // Obtener la página actual
    get currentPage(): number {
      return this.currentPage;
    }
  
    // Ir a la página anterior
    get previousPage(): number {
      return this.currentPage - 1;
    }
  
    // Ir a la siguiente página
    get nextPage(): number {
      return this.currentPage + 1;
    }
  
    // Mostrar un conjunto de botones para navegar entre las páginas
    get pages(): number[] {
      const pages = [];
      const halfMaxVisiblePages = Math.floor(this.maxVisiblePages / 2);
      const startPage = Math.max(
        1,
        this.currentPage - halfMaxVisiblePages,
      );
      const endPage = Math.min(
        this.totalPages,
        this.currentPage + halfMaxVisiblePages,
      );
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      return pages;
    }
  
    // Mostrar un conjunto de botones para navegar entre las páginas (con elipsis)
    get pagesWithEllipsis(): (number | string)[] {
      const pages: (number | string)[] = [];
      const halfMaxVisiblePages = Math.floor(this.maxVisiblePages / 2);
      const startPage = Math.max(
        1,
        this.currentPage - halfMaxVisiblePages,
      );
      const endPage = Math.min(
        this.totalPages,
        this.currentPage + halfMaxVisiblePages,
      );
  
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
          pages.push('...');
        }
        pages.push(this.totalPages);
      }
  
      return pages;
    }
  
    // Indicar si la página actual es la primera
    get isFirstPage(): boolean {
      return this.currentPage === 1;
    }
  
    // Indicar si la página actual es la última
    get isLastPage(): boolean {
      return this.currentPage === this.totalPages;
    }
  
    // Ir a la primera página
    goToFirstPage(): void {
      this.currentPages = 1;
    }
  
    // Ir a la última página
    goToLastPage(): void {
      this.currentPages = this.totalPages;
    }
  
    // Ir a una página específica
    goToPage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPages = pageNumber;
      }
    }
  }
  