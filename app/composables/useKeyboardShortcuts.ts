import { useMagicKeys, whenever } from "@vueuse/core";

type Shortcut = {
  keys: string[][];
  handler: () => void;
  preventDefault?: boolean;
};

export function useKeyboardShortcuts(...shortcuts: Shortcut[]) {
  const keys = useMagicKeys({
    passive: false,
    onEventFired(e) {
      shortcuts.forEach(({ keys, preventDefault }) => {
        const pressed = keys.some(combo => combo.every((k) => {
          if (k === "Meta") return e.metaKey;
          if (k === "Ctrl") return e.ctrlKey;
          if (k === "Shift") return e.shiftKey;
          if (k === "Alt") return e.altKey;
          return e.key.toLowerCase() === k.toLowerCase();
        }));
        if (pressed && preventDefault) e.preventDefault();
      });
    },
  });

  shortcuts.forEach(({ keys: combos, handler }) => {
    combos.forEach(combo => whenever(keys[combo.join("_")]!, handler));
  });
}
