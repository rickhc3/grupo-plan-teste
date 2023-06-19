export class QueryURI {

  protected query: string
  protected querySearch: string
  protected objQuery: IobjQuery = {
    with: [],
    isNull: [],
    isNotNull: [],
    search: [],
    searchLike: [],
    orderBy: {
      by: '',
      order: ''
    },
    perPage: 0,
    page: 1,
    total: 0
  }

  searchVetor: any[] = []
  searchOrVetor: any[] = []
  searchLikeVetor: any[] = []
  lessThanOrEqualVetor: any[] = []
  greaterThanOrEqualVetor: any[] = []

  public orderBy(colunm: string, order: string) {
    this.objQuery.orderBy.by = colunm
    this.objQuery.orderBy.order = order
    return this
  }

  public perPage(number: number) {
    this.objQuery.perPage = number
    return this
  }

  public page(number: number) {
    this.objQuery.page = number
    return this
  }

  public addWith(...items: string[]) {
    for (let i = 0; i < items.length; i++) {
      let index = this.objQuery.with.findIndex(val => val.value == items[i])
      if (index < 0)
        this.objQuery.with.push({ value: items[i] })
    }
    return this
  }

  public addIsNull(...items: string[]) {
    for (let i = 0; i < items.length; i++) {
      let index = this.objQuery.isNull.findIndex(val => val.value == items[i])
      if (index < 0)
        this.objQuery.isNull.push({ value: items[i] })
    }
    return this
  }

  public addIsNotNull(...items: string[]) {
    for (let i = 0; i < items.length; i++) {
      let index = this.objQuery.isNotNull.findIndex(val => val.value == items[i])
      if (index < 0)
        this.objQuery.isNotNull.push({ value: items[i] })
    }
    return this
  }

  public addSearch(...items: IsearchItem[]) {
    for (let i = 0; i < items.length; i++) {
      if (!this.searchVetor.includes({ colunm: items[i].colunm, value: items[i].value }))
        this.searchVetor.push({ colunm: items[i].colunm, value: items[i].value })
    }
    return this
  }

  public addSearchOr(...items: IsearchItem[]) {
    for (let i = 0; i < items.length; i++) {
      if (!this.searchOrVetor.includes({ colunm: items[i].colunm, value: items[i].value }))
        this.searchOrVetor.push({ colunm: items[i].colunm, value: items[i].value })
    }
    return this
  }

  public addSearchLike(...items: IsearchItem[]) {
    for (let i = 0; i < items.length; i++) {
      if (!this.searchLikeVetor.includes({ colunm: items[i].colunm, value: items[i].value })) {
        this.searchLikeVetor.push({ colunm: items[i].colunm, value: items[i].value })
      }
    }
    return this
  }

  public addLessThanOrEqual(...items: IsearchItem[]) {
    for (let i = 0; i < items.length; i++) {
      if (!this.lessThanOrEqualVetor.includes({ colunm: items[i].colunm, value: items[i].value })) {
        this.lessThanOrEqualVetor.push({ colunm: items[i].colunm, value: items[i].value })
      }
    }
    return this
  }

  public addGreaterThanOrEqual(...items: IsearchItem[]) {
    for (let i = 0; i < items.length; i++) {
      if (!this.greaterThanOrEqualVetor.includes({ colunm: items[i].colunm, value: items[i].value })) {
        this.greaterThanOrEqualVetor.push({ colunm: items[i].colunm, value: items[i].value })
      }
    }
    return this
  }

  public removeSearch(item: IsearchItem) {
    this.searchVetor = this.searchVetor.filter((e, i) => {
      return !(e.colunm === item.colunm && e.value === item.value)
    })
    return this
  }

  public removeSearchOr(item: IsearchItem) {
    this.searchOrVetor = this.searchOrVetor.filter((e, i) => {
      return !(e.colunm === item.colunm && e.value === item.value)
    })
    return this
  }

  public removeSearchLike(item: IsearchItem) {
    this.searchLikeVetor = this.searchLikeVetor.filter((e, i) => {
      return !(e.colunm === item.colunm && e.value === item.value)
    })
    return this
  }

  public removeLessThanOrEqual(item: IsearchItem) {
    const filter = this.lessThanOrEqualVetor.filter((e) => {
      return !(e.colunm === item.colunm && e.value === item.value)
    })
    console.log(filter, item)
    this.lessThanOrEqualVetor = this.lessThanOrEqualVetor.filter((e) => {
      return !(e.colunm === item.colunm && e.value === item.value)
    })
    return this
  }

  public removeGreaterThanOrEqualVetor(item: IsearchItem) {
    this.greaterThanOrEqualVetor = this.greaterThanOrEqualVetor.filter((e) => {
      return !(e.colunm === item.colunm && e.value === item.value)
    })
    return this
  }

  public clear(): void {
    this.objQuery = {
      with: [],
      isNull: [],
      isNotNull: [],
      search: [],
      searchLike: [],
      orderBy: {
        by: '',
        order: ''
      },
      perPage: 0,
      page: 1,
      total: 0
    }
    this.searchVetor = []
    this.searchOrVetor = []
    this.searchLikeVetor = []
    this.lessThanOrEqualVetor = []
    this.greaterThanOrEqualVetor = []
  }

  public get(): string {
    this.query = ""
    this.makeWith()
    this.makeIsNull()
    this.makeIsNotNull()
    this.makeSearchable(this.searchVetor, 'search')
    this.makeSearchable(this.searchOrVetor, 'searchOr')
    this.makeSearchable(this.searchLikeVetor, 'searchLike')
    this.makeStringLessOrGreater(this.lessThanOrEqualVetor, 'lessThanOrEqual')
    this.makeStringLessOrGreater(this.greaterThanOrEqualVetor, 'greaterThanOrEqual')
    this.makeOrderBy()
    this.makePerPage()
    this.makePage()
    this.clear()
    return this.query
  }

  protected makeSearchable(searchable: Array<IsearchItem>, name: string) {
    if (this.query !== "") this.query += '&'
    if (searchable.length > 0) this.query += `${name}=`
    let separator = ''
    for (let i = 0; i < searchable.length; i++) {
      if (i > 0) separator = ';'
      this.query += `${separator}${searchable[i].colunm}:${searchable[i].value}`
    }
  }

  protected makeStringLessOrGreater(vetor: any[], name: string) {
    vetor.map(({ colunm, value }) => { this.query += `&${name}[${colunm}]=${value}` })
  }

  protected makeWith(): void {
    for (let i = 0; i < this.objQuery.with.length; i++) {
      if (this.query === "") {
        this.query += `with[]=${this.objQuery.with[i].value}`
        continue
      }
      this.query += `&with[]=${this.objQuery.with[i].value}`
    }
  }

  protected makeIsNull(): void {
    for (let i = 0; i < this.objQuery.isNull.length; i++) {
      if (this.query === "") {
        this.query += `isNull[]=${this.objQuery.isNull[i].value}`
        continue
      }
      this.query += `&isNull[]=${this.objQuery.isNull[i].value}`
    }
  }

  protected makeIsNotNull(): void {
    for (let i = 0; i < this.objQuery.isNotNull.length; i++) {
      if (this.query === "") {
        this.query += `isNotNull[]=${this.objQuery.isNotNull[i].value}`
        continue
      }
      this.query += `&isNotNull[]=${this.objQuery.isNotNull[i].value}`
    }
  }

  protected makeOrderBy(): void {
    if (this.objQuery.orderBy.by !== '') {
      if (this.query === "") {
        this.query += `sort[by]=${this.objQuery.orderBy.by}&sort[order]=${this.objQuery.orderBy.order}`
      } else {
        this.query += `&sort[by]=${this.objQuery.orderBy.by}&sort[order]=${this.objQuery.orderBy.order}`
      }
    }
  }

  protected makePerPage(): void {
    if (this.objQuery.perPage > 0) {
      if (this.query === "") {
        this.query += `perPage=${this.objQuery.perPage}`
      } else {
        this.query += `&perPage=${this.objQuery.perPage}`
      }
    }
  }

  protected makePage(): void {
    if (this.objQuery.page > 1) {
      if (this.query === "") {
        this.query += `page=${this.objQuery.page}`
      } else {
        this.query += `&page=${this.objQuery.page}`
      }
    }
  }
}

interface IsearchItem {
  colunm: string
  value: string
}

interface IobjQuery {
  with: Array<{ value: string }>
  isNull: Array<{ value: string }>
  isNotNull: Array<{ value: string }>
  search: Array<IsearchItem>
  searchLike: Array<IsearchItem>
  orderBy: {
    by: string
    order: string
  }
  perPage: number
  page: number
  total: number
}
