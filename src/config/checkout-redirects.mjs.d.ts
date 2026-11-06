export declare const CHECKOUT_URLS: {
  readonly mw4: string;
  readonly skinChanger: string;
  readonly hwidSpoofer: string;
  readonly gameAccounts: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;
