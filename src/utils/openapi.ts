/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Activation {
  uid: string;
  token: string;
}

/** Сериализатор для создания чата. */
export interface Chat {
  /** @pattern ^[-a-zA-Z0-9_]+$ */
  companion: string;
}

/** Сериализатор для списка чатов. */
export interface ChatList {
  id: number;
  companion: string;
}

/** Сериализатор модели страны. */
export interface Country {
  /**
   * Код
   * Код страны
   * @maxLength 32
   */
  code?: string | null;
  /**
   * Название
   * Наименование
   * @maxLength 255
   */
  name: string;
  /**
   * Флаг
   * Флаг страны
   * @format uri
   */
  flag_icon: string;
}

/**
 * * `Male` - Мужской
 * * `Female` - Женский
 */
export enum GenderEnum {
  Male = "Male",
  Female = "Female",
}

/** Сериализатор модели языка. */
export interface Language {
  /**
   * Название языка
   * @maxLength 256
   */
  name: string;
  /**
   * Название языка (на этом языке)
   * @maxLength 256
   */
  name_local?: string;
  /**
   * ISO 639-1 Код языка
   * 2-символьный код языка без страны
   * @maxLength 2
   */
  isocode: string;
  /**
   * Порядок сортировки
   * Увеличьте, чтобы поднять в выборке
   * @min 0
   * @max 2147483647
   */
  sorting?: number;
}

export type NullEnum = null;

export interface PaginatedChatListList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results?: ChatList[];
}

export interface PaginatedUserList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results?: User[];
}

export interface PasswordResetConfirm {
  uid: string;
  token: string;
  new_password: string;
}

/** Сериализатор модели пользователя. */
export interface PatchedUser {
  /**
   * Электронная почта
   * Адрес email
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  /**
   * Пароль
   * @maxLength 128
   */
  password?: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /** @format uri */
  avatar?: string | null;
  age?: string;
  /**
   * Слаг
   * Слаг
   * @maxLength 150
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string | null;
  country?: Country;
  /**
   * Дата рождения
   * Дата рождения пользователя
   * @format date
   */
  birth_date?: string | null;
  native_languages?: UserNativeLanguage[];
  foreign_languages?: UserForeignLanguage[];
  /**
   * Пол
   * Пол пользователя
   *
   * * `Male` - Мужской
   * * `Female` - Женский
   */
  gender?: GenderEnum | NullEnum | null;
  /**
   * Темы для разговора
   * Темы для разговора
   * @maxLength 100
   */
  topics_for_discussion?: string;
  /**
   * О себе
   * О себе
   * @maxLength 100
   */
  about?: string;
  /** Поле для скрытия/отображения пола пользователя */
  gender_is_hidden?: boolean;
  /** Поле для скрытия/отображения возраста пользователя */
  age_is_hidden?: boolean;
}

export interface SendEmailReset {
  /** @format email */
  email: string;
}

export interface SetPassword {
  new_password: string;
  current_password: string;
}

/**
 * * `Newbie` - Новичок
 * * `Amateur` - Любитель
 * * `Profi` - Профи
 * * `Expert` - Эксперт
 * * `Guru` - Гуру
 */
export enum SkillLevelEnum {
  Newbie = "Newbie",
  Amateur = "Amateur",
  Profi = "Profi",
  Expert = "Expert",
  Guru = "Guru",
}

export interface TokenObtainPair {
  username?: string;
  password?: string;
  access?: string;
  refresh?: string;
}

export interface TokenRefresh {
  access?: string;
  refresh: string;
}

export interface TokenVerify {
  token: string;
}

/** Сериализатор модели пользователя. */
export interface User {
  /**
   * Электронная почта
   * Адрес email
   * @format email
   * @maxLength 254
   */
  email: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Пароль
   * @maxLength 128
   */
  password: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /** @format uri */
  avatar?: string | null;
  age: string;
  /**
   * Слаг
   * Слаг
   * @maxLength 150
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string | null;
  country: Country;
  /**
   * Дата рождения
   * Дата рождения пользователя
   * @format date
   */
  birth_date?: string | null;
  native_languages: UserNativeLanguage[];
  foreign_languages: UserForeignLanguage[];
  /**
   * Пол
   * Пол пользователя
   *
   * * `Male` - Мужской
   * * `Female` - Женский
   */
  gender?: GenderEnum | NullEnum | null;
  /**
   * Темы для разговора
   * Темы для разговора
   * @maxLength 100
   */
  topics_for_discussion?: string;
  /**
   * О себе
   * О себе
   * @maxLength 100
   */
  about?: string;
  /** Поле для скрытия/отображения пола пользователя */
  gender_is_hidden: boolean;
  /** Поле для скрытия/отображения возраста пользователя */
  age_is_hidden: boolean;
}

export interface UserCreate {
  /**
   * Электронная почта
   * Адрес email
   * @format email
   * @maxLength 254
   */
  email: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  id?: number;
  password: string;
}

/** Сериализатор промежутоной модели Пользователь-иностранный язык. */
export interface UserForeignLanguage {
  id: number;
  /**
   * ISO 639-1 Код языка
   * 2-символьный код языка без страны
   */
  code: string;
  /** Название языка */
  language: string;
  /**
   * Уровень владения языком
   * Укажите уровень вашего владения языком.
   *
   * * `Newbie` - Новичок
   * * `Amateur` - Любитель
   * * `Profi` - Профи
   * * `Expert` - Эксперт
   * * `Guru` - Гуру
   */
  skill_level: SkillLevelEnum;
}

/** Сериализатор промежутоной модели Пользователь-родной язык. */
export interface UserNativeLanguage {
  id: number;
  /**
   * ISO 639-1 Код языка
   * 2-символьный код языка без страны
   */
  code: string;
  /** Название языка */
  language: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams1?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  access: 'string';
  refresh: 'string';
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  private baseApiParams1: RequestParams = {
    credentials: "same-origin",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + `${localStorage.getItem('accessToken')}`},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams1,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams1.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams1.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Lang_Exchange API
 * @version 1.0.0
 *
 * API-endpoints for "Lang_Exchange" project
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     *
     * @tags auth
     * @name AuthJwtCreateCreate
     * @request POST:/api/v1/auth/jwt/create/
     */
    authJwtCreateCreate: (data: TokenObtainPair, params: RequestParams = {}) =>
      this.request<TokenObtainPair, any>({
        path: `/api/v1/auth/jwt/create/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags auth
     * @name AuthJwtRefreshCreate
     * @request POST:/api/v1/auth/jwt/refresh/
     */
    authJwtRefreshCreate: (data: TokenRefresh, params: RequestParams = {}) =>
      this.request<TokenRefresh, any>({
        path: `/api/v1/auth/jwt/refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a token and indicates if it is valid.  This view provides no information about a token's fitness for a particular use.
     *
     * @tags auth
     * @name AuthJwtVerifyCreate
     * @request POST:/api/v1/auth/jwt/verify/
     */
    authJwtVerifyCreate: (data: TokenVerify, params: RequestParams = {}) =>
      this.request<TokenVerify, any>({
        path: `/api/v1/auth/jwt/verify/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Просмотреть свои чаты
     *
     * @tags chats
     * @name ChatsList
     * @request GET:/api/v1/chats/
     * @secure
     */
    chatsList: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedChatListList, any>({
        path: `/api/v1/chats/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Начать чат
     *
     * @tags chats
     * @name ChatsCreate
     * @request POST:/api/v1/chats/
     * @secure
     */
    chatsCreate: (data: Chat, params: RequestParams = {}) =>
      this.request<Chat, any>({
        path: `/api/v1/chats/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Просмотреть чат
     *
     * @tags chats
     * @name ChatsRetrieve
     * @request GET:/api/v1/chats/{id}/
     * @secure
     */
    chatsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Chat, any>({
        path: `/api/v1/chats/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Очистить сообщения чата
     *
     * @tags chats
     * @name ChatsClearCreate
     * @request POST:/api/v1/chats/{id}/clear/
     * @secure
     */
    chatsClearCreate: (id: number, data: Chat, params: RequestParams = {}) =>
      this.request<Chat, any>({
        path: `/api/v1/chats/${id}/clear/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Отправить сообщение в чат
     *
     * @tags chats
     * @name ChatsSendMessageCreate
     * @request POST:/api/v1/chats/{id}/send_message/
     * @secure
     */
    chatsSendMessageCreate: (id: number, data: Chat, params: RequestParams = {}) =>
      this.request<Chat, any>({
        path: `/api/v1/chats/${id}/send_message/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели страны.
     *
     * @tags countries
     * @name CountriesList
     * @request GET:/api/v1/countries/
     * @secure
     */
    countriesList: (
      query?: {
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Country[], any>({
        path: `/api/v1/countries/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели страны.
     *
     * @tags countries
     * @name CountriesRetrieve
     * @request GET:/api/v1/countries/{code}/
     * @secure
     */
    countriesRetrieve: (code: string, params: RequestParams = {}) =>
      this.request<Country, any>({
        path: `/api/v1/countries/${code}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели языка.
     *
     * @tags languages
     * @name LanguagesList
     * @request GET:/api/v1/languages/
     * @secure
     */
    languagesList: (
      query?: {
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Language[], any>({
        path: `/api/v1/languages/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели языка.
     *
     * @tags languages
     * @name LanguagesRetrieve
     * @request GET:/api/v1/languages/{isocode}/
     * @secure
     */
    languagesRetrieve: (isocode: string, params: RequestParams = {}) =>
      this.request<Language, any>({
        path: `/api/v1/languages/${isocode}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersList
     * @request GET:/api/v1/users/
     * @secure
     */
    usersList: (
      query?: {
        age?: string;
        /**
         * Код
         * Код страны
         */
        country?: string | null;
        /**
         * ISO 639-1 Код языка
         * 2-символьный код языка без страны
         */
        foreign_languages?: string;
        /**
         * Пол
         * Пол пользователя
         *
         * * `Male` - Мужской
         * * `Female` - Женский
         */
        gender?: "Female" | "Male" | null;
        /** Number of results to return per page. */
        limit?: number;
        /**
         * ISO 639-1 Код языка
         * 2-символьный код языка без страны
         */
        native_languages?: string;
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /**
         * Уровень владения языком
         * Укажите уровень вашего владения языком.
         *
         * * `Newbie` - Новичок
         * * `Amateur` - Любитель
         * * `Profi` - Профи
         * * `Expert` - Эксперт
         * * `Guru` - Гуру
         */
        skill_level?: "Amateur" | "Expert" | "Guru" | "Newbie" | "Profi";
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedUserList, any>({
        path: `/api/v1/users/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/api/v1/users/
     * @secure
     */
    usersCreate: (data: UserCreate, params: RequestParams = {}) =>
      this.request<UserCreate, any>({
        path: `/api/v1/users/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersRetrieve
     * @request GET:/api/v1/users/{slug}/
     * @secure
     */
    usersRetrieve: (slug: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/users/${slug}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersActivationCreate
     * @request POST:/api/v1/users/activation/
     * @secure
     */
    usersActivationCreate: (data: Activation, params: RequestParams = {}) =>
      this.request<Activation, any>({
        path: `/api/v1/users/activation/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Метод для отображения/скрытия возраста.
     *
     * @tags users
     * @name UsersHideShowAgePartialUpdate
     * @request PATCH:/api/v1/users/hide_show_age/
     * @secure
     */
    usersHideShowAgePartialUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/hide_show_age/`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Метод для отображения/скрытия пола.
     *
     * @tags users
     * @name UsersHideShowGenderPartialUpdate
     * @request PATCH:/api/v1/users/hide_show_gender/
     * @secure
     */
    usersHideShowGenderPartialUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/hide_show_gender/`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersMeRetrieve
     * @request GET:/api/v1/users/me/
     * @secure
     */
    usersMeRetrieve: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/users/me/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersMePartialUpdate
     * @request PATCH:/api/v1/users/me/
     * @secure
     */
    usersMePartialUpdate: (data: PatchedUser, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/users/me/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersMeDestroy
     * @request DELETE:/api/v1/users/me/
     * @secure
     */
    usersMeDestroy: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/me/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersResendActivationCreate
     * @request POST:/api/v1/users/resend_activation/
     * @secure
     */
    usersResendActivationCreate: (data: SendEmailReset, params: RequestParams = {}) =>
      this.request<SendEmailReset, any>({
        path: `/api/v1/users/resend_activation/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersResetPasswordCreate
     * @request POST:/api/v1/users/reset_password/
     * @secure
     */
    usersResetPasswordCreate: (data: SendEmailReset, params: RequestParams = {}) =>
      this.request<SendEmailReset, any>({
        path: `/api/v1/users/reset_password/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersResetPasswordConfirmCreate
     * @request POST:/api/v1/users/reset_password_confirm/
     * @secure
     */
    usersResetPasswordConfirmCreate: (data: PasswordResetConfirm, params: RequestParams = {}) =>
      this.request<PasswordResetConfirm, any>({
        path: `/api/v1/users/reset_password_confirm/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Вьюсет модели пользователя.
     *
     * @tags users
     * @name UsersSetPasswordCreate
     * @request POST:/api/v1/users/set_password/
     * @secure
     */
    usersSetPasswordCreate: (data: SetPassword, params: RequestParams = {}) =>
      this.request<SetPassword, any>({
        path: `/api/v1/users/set_password/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
