/**
 * mondial-relay.ts
 * Lightweight typed wrapper for the Mondial Relay parcel-shop picker widget v4.1
 * Automatically loads all required dependencies (jQuery, Leaflet, MR plugin)
 *
 * Minimal usage:
 *   const instance = await MondialRelay.init('#my-container', {
 *     brand: 'BDTEST ',
 *     onSelect: (relay) => console.log(relay.id, relay.name)
 *   })
 */

// ─── Raw types coming back from the MR jQuery plugin ─────────────────────────

interface MRRawRelay {
    ID: string;
    Nom: string;
    Adresse1: string;
    Adresse2?: string;
    CP: string;
    Ville: string;
    Pays: string;
    Lat: string;
    Long: string;
    Photo: string | null;
    HoursHtmlTable: string;
}

interface MRRawSearchResult {
    PRList: MRRawRelay[];
}

interface MRPluginOptions {
    Target: string;
    TargetDisplay?: string;
    TargetDisplayInfoPR?: string;
    Brand: string;
    Country?: string;
    PostCode?: string;
    AllowedCountries?: string;
    ColLivMod?: string;
    NbResults?: string;
    Weight?: number;
    SearchDelay?: number;
    SearchFar?: number;
    ShowResultsOnMap?: boolean;
    DisplayMapInfo?: boolean;
    MapScrollWheel?: boolean;
    Responsive?: boolean;
    EnableGeolocalisatedSearch?: boolean;
    EnableGmap?: boolean;
    CSS?: '0' | '1';
    OnParcelShopSelected?: (data: MRRawRelay) => void;
    OnSearchSuccess?: (data: MRRawSearchResult) => void;
    OnNoResultReturned?: () => void;
}

// Extend jQuery to include the MR plugin method
declare global {
    interface Window {
        jQuery: JQueryStatic;
    }
    interface JQuery {
        MR_ParcelShopPicker(options: MRPluginOptions): JQuery;
        trigger(eventType: string, data?: unknown | unknown[]): JQuery;
        empty(): JQuery;
    }
}

// ─── Public-facing types ──────────────────────────────────────────────────────

/** A normalized relay point returned by onSelect / onSearchSuccess. */
export interface RelayPoint {
    /** Mondial Relay relay point ID (e.g. "066974") */
    id: string;
    /** Relay point name */
    name: string;
    /** Full street address */
    address: string;
    /** Postal code */
    postCode: string;
    /** City */
    city: string;
    /** ISO 2-letter country code */
    country: string;
    /** Latitude as string (as returned by MR) */
    lat: string;
    /** Longitude as string (as returned by MR) */
    lng: string;
    /** Photo URL, if available */
    photo: string | null;
    /** Opening hours as an HTML table string */
    hours: string;
    /** Original unmodified data from the MR plugin */
    _raw: MRRawRelay;
}

/** Delivery mode supported by Mondial Relay */
export type DeliveryMode = '24R' | '24L' | '24X' | 'DRI';

/** Options passed to MondialRelay.init() */
export interface MondialRelayOptions {
    /**
     * REQUIRED — Your Mondial Relay client code.
     * Must be exactly 8 characters; pad with trailing spaces if needed.
     * Use 'BDTEST  ' for testing.
     */
    brand: string;

    /**
     * ISO 2-letter country code for the initial search.
     * @default 'FR'
     */
    country?: string;

    /** Postal code used to trigger an automatic search on load. */
    postCode?: string;

    /**
     * Comma-separated list of country codes the user is allowed to search in.
     * @example 'FR,ES,BE'
     */
    allowedCountries?: string;

    /**
     * Delivery mode filter.
     * - '24R' Standard Point Relais® (default)
     * - '24L' XL
     * - '24X' XXL
     * - 'DRI' Drive
     * @default '24R'
     */
    deliveryMode?: DeliveryMode;

    /**
     * Maximum number of relay points to display.
     * @default 7
     */
    nbResults?: number;

    /** Parcel weight in grams — used to filter incompatible relay points. */
    weight?: number;

    /**
     * Number of days between the search and the planned drop-off.
     * Filters out relay points that will be on holiday.
     */
    searchDelay?: number;

    /** Maximum search radius in km. */
    searchFar?: number;

    /**
     * Show relay points on an interactive map.
     * @default true
     */
    showMap?: boolean;

    /**
     * Show an info tooltip when a relay point is selected on the map.
     * @default true
     */
    mapInfo?: boolean;

    /**
     * Enable scroll-to-zoom on the map.
     * @default false
     */
    scrollWheel?: boolean;

    /**
     * Enable responsive layout.
     * @default false
     */
    responsive?: boolean;

    /**
     * Offer browser geolocation as a search option.
     * @default false
     */
    geolocation?: boolean;

    /**
     * Set to true to disable the built-in Mondial Relay stylesheet
     * and provide your own CSS.
     * @default false
     */
    customCss?: boolean;

    /**
     * Use Google Maps instead of the default Leaflet/OpenStreetMap.
     * Requires googleMapsKey to be set.
     * @default false
     */
    useGoogleMaps?: boolean;

    /** Google Maps API key. Required when useGoogleMaps is true. */
    googleMapsKey?: string;

    /**
     * Fired when the user selects a relay point.
     * @param relay — Normalized relay point data
     */
    onSelect?: (relay: RelayPoint) => void;

    /**
     * Fired after a successful search that returned results.
     * @param results — Array of matching relay points (id, name, address, postCode, city, country)
     */
    onSearchSuccess?: (results: Pick<RelayPoint, 'id' | 'name' | 'address' | 'postCode' | 'city' | 'country'>[]) => void;

    /** Fired when a search returns no results. */
    onNoResult?: () => void;
}

/** Runtime params accepted by instance.setParams() */
export type RuntimeParams = Partial<
    Pick<MondialRelayOptions, 'deliveryMode' | 'country' | 'nbResults' | 'weight'>
> & Record<string, unknown>;

/** Instance returned by MondialRelay.init() */
export interface WidgetInstance {
    /**
     * Programmatically trigger a search by postal code.
     * @param postCode - Target postal code
     * @param country  - ISO 2-letter country code (falls back to init country)
     */
    search(postCode: string, country?: string): this;

    /**
     * Update widget parameters at runtime without re-mounting.
     * Accepts the same friendly keys as init() options, plus any raw MR key.
     * @example instance.setParams({ deliveryMode: '24L' })
     */
    setParams(params: RuntimeParams): this;

    /**
     * Force the map to re-render.
     * Call this when the widget container was hidden (e.g. inside a modal or tab)
     * at the time the page loaded.
     */
    rebindMap(): this;

    /**
     * Return the ID of the currently selected relay point, or null if none.
     */
    getSelectedId(): string | null;

    /**
     * Destroy the widget and remove all injected DOM nodes.
     */
    destroy(): void;
}

// ─── Dependency URLs ──────────────────────────────────────────────────────────

const DEPS = {
    jquery:     'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
    leafletJs:  'https://unpkg.com/leaflet/dist/leaflet.js',
    leafletCss: 'https://unpkg.com/leaflet/dist/leaflet.css',
    mrWidget:   'https://api.mondialrelay.com/Web_Services/web/MR_ParcelShopPicker.asp',
} as const;

// ─── Dependency loaders ───────────────────────────────────────────────────────

function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(s);
    });
}

function loadCss(href: string): void {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel  = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
}

async function loadDeps(useGoogleMaps: boolean, googleMapsKey?: string): Promise<void> {
    loadCss(DEPS.leafletCss);
    await loadScript(DEPS.jquery);

    if (useGoogleMaps && googleMapsKey) {
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}`);
    } else {
        await loadScript(DEPS.leafletJs);
    }

    await loadScript(DEPS.mrWidget);
}

// ─── Hidden input helpers ─────────────────────────────────────────────────────

interface HiddenInputRefs {
    target: string;
    targetDisplay: string;
    targetInfoPR: string;
}

function createHiddenInputs(containerId: string): HiddenInputRefs {
    const suffixes = ['__target', '__display', '__infoPR'] as const;

    suffixes.forEach((suffix) => {
        const id = containerId + suffix;
        if (!document.getElementById(id)) {
            const el = document.createElement('input');
            el.type = 'hidden';
            el.id   = id;
            document.body.appendChild(el);
        }
    });

    return {
        target      : `#${containerId}__target`,
        targetDisplay: `#${containerId}__display`,
        targetInfoPR : `#${containerId}__infoPR`,
    };
}

// ─── Options normalizer ───────────────────────────────────────────────────────

function normalizeOptions(o: MondialRelayOptions): MRPluginOptions {
    if (!o.brand) throw new Error('[MondialRelay] The "brand" option is required.');

    const raw: MRPluginOptions = {
        // Required — will be set by init() after hidden inputs are created
        Target: '',

        Brand                     : o.brand,
        Country                   : o.country          ?? 'FR',
        PostCode                  : o.postCode,
        AllowedCountries          : o.allowedCountries,
        ColLivMod                 : o.deliveryMode      ?? '24R',
        NbResults                 : String(o.nbResults  ?? 7),
        Weight                    : o.weight,
        SearchDelay               : o.searchDelay,
        SearchFar                 : o.searchFar,
        ShowResultsOnMap          : o.showMap           !== false,
        DisplayMapInfo            : o.mapInfo           !== false,
        MapScrollWheel            : o.scrollWheel       ?? false,
        Responsive                : o.responsive        ?? false,
        EnableGeolocalisatedSearch: o.geolocation       ?? false,
        EnableGmap                : o.useGoogleMaps     ?? false,
        CSS                       : o.customCss         ? '0' : '1',
    };

    if (o.onSelect) {
        raw.OnParcelShopSelected = (data: MRRawRelay) => {
            o.onSelect!({
                id      : data.ID,
                name    : data.Nom,
                address : `${data.Adresse1} ${data.Adresse2 ?? ''}`.trim(),
                postCode: data.CP,
                city    : data.Ville,
                country : data.Pays,
                lat     : data.Lat,
                lng     : data.Long,
                photo   : data.Photo,
                hours   : data.HoursHtmlTable,
                _raw    : data,
            });
        };
    }

    if (o.onSearchSuccess) {
        raw.OnSearchSuccess = (data: MRRawSearchResult) => {
            const results = (data.PRList ?? []).map((pr) => ({
                id      : pr.ID,
                name    : pr.Nom,
                address : `${pr.Adresse1} ${pr.Adresse2 ?? ''}`.trim(),
                postCode: pr.CP,
                city    : pr.Ville,
                country : pr.Pays,
            }));
            o.onSearchSuccess!(results);
        };
    }

    if (o.onNoResult) {
        raw.OnNoResultReturned = o.onNoResult;
    }

    // Strip undefined keys so the plugin doesn't receive unexpected values
    (Object.keys(raw) as (keyof MRPluginOptions)[]).forEach((k) => {
        if (raw[k] === undefined) delete raw[k];
    });

    return raw;
}

// ─── Public API ───────────────────────────────────────────────────────────────

const MAPPED_KEYS = ['deliveryMode', 'country', 'nbResults', 'weight'] as const;

export const MondialRelay = {
    /**
     * Mount the Mondial Relay widget inside the given container.
     *
     * @param container  CSS selector string or DOM element
     * @param options    Configuration — see MondialRelayOptions
     * @returns          Promise resolving to a WidgetInstance
     *
     * @example
     * const widget = await MondialRelay.init('#picker', {
     *   brand: 'MYCODE  ',
     *   postCode: '75001',
     *   onSelect: (relay) => saveToStore(relay),
     * })
     */
    async init(
        container: string | HTMLElement,
        options: MondialRelayOptions,
    ): Promise<WidgetInstance> {
        const el: HTMLElement | null =
            typeof container === 'string'
                ? document.querySelector<HTMLElement>(container)
                : container;

        if (!el) throw new Error(`[MondialRelay] Container not found: ${container}`);

        // Ensure a stable ID for hidden input naming
        if (!el.id) el.id = `mr-widget-${Date.now()}`;
        const containerId = el.id;

        const opts   = normalizeOptions(options);
        const inputs = createHiddenInputs(containerId);

        opts.Target              = inputs.target;
        opts.TargetDisplay       = inputs.targetDisplay;
        opts.TargetDisplayInfoPR = inputs.targetInfoPR;

        await loadDeps(opts.EnableGmap ?? false, options.googleMapsKey);

        const $ = window.jQuery;
        if (!$) throw new Error('[MondialRelay] jQuery is required but was not loaded');

        const $el = $(el);
        $el.MR_ParcelShopPicker(opts);

        // ── Widget instance ───────────────────────────────────────────────────────
        return {
            search(postCode, country) {
                $el.trigger('MR_DoSearch', [postCode, country ?? opts.Country]);
                return this;
            },

            setParams(params) {
                const mrParams: Record<string, unknown> = {};
                if (params.deliveryMode) mrParams['ColLivMod'] = params.deliveryMode;
                if (params.country)      mrParams['Country']   = params.country;
                if (params.nbResults)    mrParams['NbResults'] = String(params.nbResults);
                if (params.weight)       mrParams['Weight']    = params.weight;
                // Pass through any raw MR keys not covered above
                Object.keys(params).forEach((k) => {
                    if (!((MAPPED_KEYS as unknown as readonly string[]).includes(k))) {
                        mrParams[k] = (params as Record<string, unknown>)[k];
                    }
                });
                $el.trigger('MR_SetParams', mrParams);
                return this;
            },

            rebindMap() {
                $el.trigger('MR_RebindMap');
                return this;
            },

            getSelectedId() {
                return (document.getElementById(`${containerId}__target`) as HTMLInputElement | null)
                    ?.value || null;
            },

            destroy() {
                $el.empty();
                ['__target', '__display', '__infoPR'].forEach((suffix) => {
                    document.getElementById(containerId + suffix)?.remove();
                });
            },
        } satisfies WidgetInstance;
    },
};

export default MondialRelay;
