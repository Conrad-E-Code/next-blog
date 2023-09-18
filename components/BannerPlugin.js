import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, COMMAND_PRIORITY_NORMAL, ElementNode, createCommand } from "lexical";
import {$setBlocksType} from "@lexical/selection"
export class BannerNode extends ElementNode {
    constructor(key) {
        super(key);

    }
    static getType() {
        return "banner"
    }

    static clone(node) {
        return new BannerNode(node.__key);
    }

    createDOM(config) {
        const element = document.createElement('div')
        element.className = config.theme.banner
        return element
    }
    // updateDOM(_prevNode, _dom, _config) {

    // }
}

export function $createBannerNode() {
    return new BannerNode()
}

export function $isBannerNode(node) {
    return node instanceof BannerNode

}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner')


export function BannerPlugin() {
    const [editor] = useLexicalComposerContext()
   if ( !editor.hasNodes([BannerNode]) ) {
    throw new Error("BannerPlugin: BannerNode not registered on editor")
   }
    editor.registerCommand(INSERT_BANNER_COMMAND, () => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            $setBlocksType(selection, $createBannerNode)
        }
        return true
        // true prevents propagation

    }, COMMAND_PRIORITY_LOW)
    return null
}