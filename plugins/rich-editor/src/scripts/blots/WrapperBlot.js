/**
 * @author Adam (charrondev) Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

import Container from "quill/blots/container";
import Parchment from "parchment";

/**
 * A Blot implementing functions necessary to wrap another Blot as a "Dump" DOM Element.
 *
 * The wrapped blots should additionally use the `wrappedBlot` Higher-order function in `quill-utilities`.
 */
export default class WrapperBlot extends Container {

    static scope = Parchment.Scope.BLOCK;
    static tagName = "div";

    /**
     * We want to NOT return the format of this Blot. This blot should never be created on its own. Only through its
     * child blot. Always return undefined.
     */
    static formats() {
        return;
    }

    /**
     * Apply className if applicable.
     *
     * @returns {Node} - The DOM Node for the Blot.
     */
    static create() {
        const domNode = super.create();

        if (this.className) {
            domNode.classList.add(this.className);
        }
        return domNode;
    }

    /**
     * Join the children elements together where possible.
     *
     * @param {any} context -
     */
    optimize(context) {
        super.optimize(context);
        const next = this.next;
        if (next != null && next.prev === this &&
            next.constructor.blotName === this.constructor.blotName &&
            next.domNode.tagName === this.domNode.tagName) {
            next.moveChildren(this);
            next.remove();
        }
    }
}