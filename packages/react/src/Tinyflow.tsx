import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {
    Tinyflow as TinyflowNative,
    type TinyflowOptions as TinyflowNativeOptions
} from '@tinyflow-ai/ui';
import '@tinyflow-ai/ui/dist/index.css';

export type TinyflowOptions = {
    style?: React.CSSProperties;
    className?: string;
} & Omit<TinyflowNativeOptions, 'element'>;

export interface TinyflowHandle {
    getData: () => any;
}

const Tinyflow = forwardRef<TinyflowHandle, TinyflowOptions>((options, ref) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const tinyflowInstance = useRef<TinyflowNative | null>(null);

    useImperativeHandle(ref, () => ({
        getData: () => {
            if (tinyflowInstance.current) {
                return tinyflowInstance.current.getData();
            }
            console.warn('Tinyflow instance is not initialized');
            return null;
        }
    }));

    const { data, style, className } = options;

    useEffect(() => {
        if (divRef.current) {
            const tinyflow = new TinyflowNative({
                ...options,
                element: divRef.current
                // data: data
            });

            tinyflowInstance.current = tinyflow;

            return () => {
                tinyflow.destroy();
                tinyflowInstance.current = null;
            };
        }
    }, [data]);

    return <div ref={divRef} style={{ height: '600px', ...style }} className={className} />;
}) as React.ForwardRefExoticComponent<TinyflowOptions & React.RefAttributes<TinyflowHandle>>;

export default Tinyflow;
