<script lang="ts">
    import NodeWrapper from '../core/NodeWrapper.svelte';
    import { type Node, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
    import { Button, Heading } from '../base';
    import RefParameterList from '../core/RefParameterList.svelte';
    import { getCurrentNodeId } from '../../store/nodeContext';
    import { useAddParameter } from '../utils/useAddParameter';
    import { getOptions } from '../utils/NodeUtils';
    import OutputDefList from '../core/OutputDefList.svelte';

    const { data, ...rest }: {
        data: NodeProps['data'],
        [key: string]: any
    } = $props();

    const currentNodeId = getCurrentNodeId();
    const { addParameter } = useAddParameter();
    const flowInstance = useSvelteFlow();

    const node = {
        ...rest,
        id: currentNodeId,
        data
    } as Node;

    const externalElement = document.createElement('div') as HTMLElement;
    const options = getOptions();
    const customNode = options.customNodes![rest.type as string];
    customNode.render?.(externalElement, node, flowInstance);

    let container: HTMLElement;
    $effect(() => {
        // 注意：由于 $effect 的 state 自动追踪问题，需要 data.expand 方在 if 里的最前面
        if (data.expand && container) {
            container.append(externalElement);
        }
    });

    $effect(() => {
        if (data) {
            customNode.onUpdate?.(externalElement, { ...node, data });
        }
    });

</script>


<NodeWrapper data={{...data, description: customNode.description}} {...rest}>

    {#snippet icon()}
        {@html customNode.icon}
    {/snippet}

    {#if customNode.parametersEnable !== false}
        <div class="heading">
            <Heading level={3}>输入参数</Heading>
            <Button class="input-btn-more" style="margin-left: auto" onclick={()=>{
            addParameter(currentNodeId)
        }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
            </Button>
        </div>

        <RefParameterList />
    {/if}


    <div bind:this={container} style={customNode.rootStyle||""} class={customNode.rootClass}></div>


    {#if customNode.outputDefsEnable !== false}
        <div class="heading">
            <Heading level={3} mt="10px">输出参数</Heading>
            <Button class="input-btn-more" style="margin-left: auto" onclick={()=>{
            addParameter(currentNodeId,'outputDefs')
        }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
            </Button>
        </div>
        <OutputDefList />
    {/if}

</NodeWrapper>

<style>
    .heading {
        display: flex;
        margin-bottom: 10px;
    }
</style>



