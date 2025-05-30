import { Edge } from '@xyflow/svelte';
import { Node as Node_2 } from '@xyflow/svelte';
import { useSvelteFlow } from '@xyflow/svelte';
import { Viewport } from '@xyflow/svelte';

export declare type CustomNode = {
    title: string;
    description?: string;
    icon?: string;
    sortNo?: number;
    rootClass?: string;
    rootStyle?: string;
    parametersEnable?: boolean;
    outputDefsEnable?: boolean;
    render?: (parent: HTMLElement, node: Node_2, flowInstance: ReturnType<typeof useSvelteFlow>) => void;
    onUpdate?: (parent: HTMLElement, node: Node_2) => void;
};

export declare type Item = {
    value: number | string;
    label: string;
    children?: Item[];
};

export declare class Tinyflow {
    private options;
    private rootEl;
    private svelteFlowInstance;
    constructor(options: TinyflowOptions);
    private _init;
    private _setOptions;
    getOptions(): TinyflowOptions;
    getData(): {
        nodes: Node_2[];
        edges: Edge[];
        viewport: Viewport;
    };
    setData(data: TinyflowData): void;
    destroy(): void;
}

export declare type TinyflowData = Partial<ReturnType<ReturnType<typeof useSvelteFlow>['toObject']>>;

export declare type TinyflowOptions = {
    element: string | Element;
    data?: TinyflowData | string;
    provider?: {
        llm?: () => Item[] | Promise<Item[]>;
        knowledge?: () => Item[] | Promise<Item[]>;
        searchEngine?: () => Item[] | Promise<Item[]>;
    };
    customNodes?: Record<string, CustomNode>;
    onNodeExecute?: (node: Node_2) => void;
    onDataChange?: (data: TinyflowData, event: {
        eventType: string;
    }) => void;
};

export { }
