import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getSelection, $isRangeSelection, $setSelection, COMMAND_PRIORITY_LOW, COMMAND_PRIORITY_NORMAL, ElementNode, createCommand, insertLineBreak } from "lexical";
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

    insertNewAfter(selection, blah) {
        const newBlock = $createParagraphNode()
        const direction = this.getDirection()
        newBlock.setDirection(direction)
        this.insertAfter(newBlock, blah)
        newBlock.select()
    }

    // collapseAtStart() {
    //     const para = $createParagraphNode()
    //     const children = this.getChildren()
    //     children.forEach( child => para.append(child))
    //     this.replace(para)
    //     return true

    // }

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