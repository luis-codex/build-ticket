/**
 * Utility functions for DOM manipulation.
 */
const DOMUtils = {
    /**
     * Selects a single element from the DOM.
     * @param selector - The CSS selector to match the element.
     * @returns The matched element or null if no element matches.
     */
    $: <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector),

    /**
     * Selects all elements that match the CSS selector.
     * @param selector - The CSS selector to match the elements.
     * @returns A NodeList of matched elements.
     */
    $$: <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelectorAll<T>(selector),

    /**
     * Adds an event listener to an element.
     * @param selector - The CSS selector to match the element.
     * @param event - The event type to listen for.
     * @param handler - The event handler function.
     */
    on: <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
        selector: string,
        event: K,
        handler: (this: T, ev: HTMLElementEventMap[ K ]) => void
    ) => {
        const element = document.querySelector<T>(selector);
        if (element) {
            element.addEventListener(event, handler as EventListener);
        }
    },

    /**
     * Removes an event listener from an element.
     * @param selector - The CSS selector to match the element.
     * @param event - The event type to remove.
     * @param handler - The event handler function.
     */
    off: <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
        selector: string,
        event: K,
        handler: (this: T, ev: HTMLElementEventMap[ K ]) => void
    ) => {
        const element = document.querySelector<T>(selector);
        if (element) {
            element.removeEventListener(event, handler as EventListener);
        }
    },

    /**
     * Adds a class to an element.
     * @param item - The CSS selector or the element itself.
     * @param className - The class name to add.
     */
    addClass: <T extends HTMLElement>(item: string | T, className: string) => {
        const element = typeof item === 'string' ? document.querySelector<T>(item) : item;
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Removes a class from an element.
     * @param item - The CSS selector or the element itself.
     * @param className - The class name to remove.
     */
    removeClass: <T extends HTMLElement>(item: string | T, className: string) => {
        const element = typeof item === 'string' ? document.querySelector<T>(item) : item;
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Gets the value of an input element.
     * @param selector - The CSS selector or the input element itself.
     * @returns The value of the input element or null if not found.
     */
    getInputValue: <T extends HTMLInputElement>(selector: string | T) => {
        const input = typeof selector === 'string' ? document.querySelector<T>(selector) : selector;
        return input ? input.value : null;
    },

    /**
     * Sets the value of an input element.
     * @param selector - The CSS selector or the input element itself.
     * @param value - The value to set.
     */
    setInputValue: <T extends HTMLInputElement>(selector: string | T, value: string) => {
        const input = typeof selector === 'string' ? document.querySelector<T>(selector) : selector;
        if (input) {
            input.value = value;
        }
    },

    /**
     * Sets inline styles on an element.
     * @param selector - The CSS selector or the element itself.
     * @param styles - An object containing the styles to set.
     */
    setStyle: <T extends HTMLElement>(selector: string | T, styles: CSSStyleDeclaration) => {
        const element = typeof selector === 'string' ? document.querySelector<T>(selector) : selector;
        if (element) {
            Object.assign(element.style, styles);
        }
    },

    /**
     * Waits for an element to be available in the DOM and then executes a callback.
     * @param selector - The CSS selector to match the element.
     * @param callback - The callback function to execute when the element is available.
     */
    waitForElement: (selector: string, callback: (element: HTMLElement) => void) => {
        const observer = new MutationObserver(() => {
            const element = document.querySelector<HTMLElement>(selector);
            if (element) {
                callback(element);
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    },

    /**
     * Adds an animation class to an element and removes it after the animation ends.
     * @param selector - The CSS selector or the element itself.
     * @param animationClass - The animation class to add.
     */
    addAnimation: <T extends HTMLElement>(selector: string | T, animationClass: string) => {
        const element = typeof selector === 'string' ? document.querySelector<T>(selector) : selector;
        if (element) {
            element.classList.add(animationClass);
            element.addEventListener('animationend', () => {
                element.classList.remove(animationClass);
            }, { once: true });
        }
    },
    addAnimationAndCallback: <T extends HTMLElement>(selector: string | T, animationClass: string, callback: () => void) => {
        const element = typeof selector === 'string' ? document.querySelector<T>(selector) : selector;
        if (element) {
            element.classList.add(animationClass);
            element.addEventListener('animationend', () => {
                element.classList.remove(animationClass);
                callback();
            }, { once: true });
        }
    },
};

export const { $, $$, addAnimationAndCallback } = DOMUtils;
