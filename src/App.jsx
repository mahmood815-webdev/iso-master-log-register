<!DOCTYPE html>
<html class="">
    <head>
        <meta charset="utf-8">
        <style>
/* Example CSS for your Header Container */
.header-info-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}
            .error-boundary {
                border: 2px dashed rgba(255, 0, 0, 0.3);
                position: relative;
            }
            .error-boundary::after {
                content: "⚠️";
                position: absolute;
                top: 0;
                right: 0;
                background: rgba(255, 0, 0, 0.1);
                color: red;
                font-size: 14px;
                padding: 2px 6px;
                border-radius: 0 0 0 4px;
                pointer-events: none;
            }
            .loading-spinner {
                @apply flex items-center justify-center;
                @apply min-h-[200px];
                @apply bg-gradient-to-br from-white/5 to-white/10;
                @apply rounded-xl;
                @apply backdrop-blur-sm;
            }
            .loading-spinner::after {
                content: '';
                @apply w-12 h-12;
                @apply border-4 border-primary/20;
                @apply border-t-primary;
                @apply rounded-full;
                @apply animate-spin;
                @apply shadow-lg;
            }

            /* Base text and background colors for all elements */
            body {
                @apply bg-background text-foreground;
            }

            /* Form elements styling */
            input, textarea, select {
                @apply bg-background text-foreground border-input;
                @apply placeholder:text-muted-foreground;
                @apply focus:outline-none focus:ring-2 focus:ring-ring;
            }

            /* Handle filled state */
            input:not(:placeholder-shown),
            textarea:not(:placeholder-shown),
            select:not(:placeholder-shown) {
                @apply bg-background;
            }

            /* Ensure proper contrast in both modes */
            .dark input, .dark textarea, .dark select {
                @apply bg-background/95;
            }

            input, textarea, select {
                @apply bg-background/95;
            }

            /* Handle disabled state */
            input:disabled,
            textarea:disabled,
            select:disabled {
                @apply opacity-50 cursor-not-allowed;
            }

            /* Button styling */
            button {
                @apply bg-primary text-primary-foreground hover:bg-primary/90;
                @apply disabled:opacity-50 disabled:cursor-not-allowed;
                @apply focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2;
            }

            /* Secondary button variant */
            button.secondary {
                @apply bg-secondary text-secondary-foreground hover:bg-secondary/80;
            }

            /* Card styling */
            .card {
                @apply bg-card text-card-foreground;
                @apply border border-border;
                @apply rounded-lg shadow-sm;
            }

            /* Popover and dropdown styling */
            .popover {
                @apply bg-popover text-popover-foreground;
                @apply border border-border;
                @apply shadow-md rounded-md;
            }

            /* Link styling */
            a {
                @apply text-primary hover:text-primary/80;
                @apply focus:outline-none focus:ring-2 focus:ring-ring;
            }

            /* Muted text */
            .text-muted {
                @apply text-muted-foreground;
            }

            /* Accent backgrounds */
            .bg-accent {
                @apply bg-accent text-accent-foreground;
            }

            /* Destructive elements */
            .destructive {
                @apply bg-destructive text-destructive-foreground hover:bg-destructive/90;
            }

            /* Code blocks and pre elements */
            pre, code {
                @apply bg-muted text-muted-foreground;
                @apply rounded px-[0.3em] py-[0.2em];
            }

            /* Table styling */
            table {
                @apply border-collapse w-full;
            }

            th, td {
                @apply border border-border;
                @apply p-2 text-left;
            }

            th {
                @apply bg-muted font-semibold;
            }

            /* Badge/tag styling */
            .badge {
                @apply inline-flex items-center rounded-full;
                @apply px-2.5 py-0.5 text-xs font-semibold;
                @apply bg-primary/10 text-primary-foreground;
            }

            /* Focus outline for accessibility */
            :focus-visible {
                @apply outline-none ring-2 ring-ring ring-offset-2;
            }

            /* Selection styling */
            ::selection {
                @apply bg-primary/20 text-foreground;
            }
        </style>

        <!-- Styles -->
        <style>
            :root {
                --background: 0 0% 100%;
                --foreground: 222.2 84% 4.9%;
                --card: 0 0% 100%;
                --card-foreground: 222.2 84% 4.9%;
                --popover: 0 0% 100%;
                --popover-foreground: 222.2 84% 4.9%;
                --primary: 222.2 47.4% 11.2%;
                --primary-foreground: 210 40% 98%;
                --secondary: 210 40% 96.1%;
                --secondary-foreground: 222.2 47.4% 11.2%;
                --muted: 210 40% 96.1%;
                --muted-foreground: 215.4 16.3% 46.9%;
                --accent: 210 40% 96.1%;
                --accent-foreground: 222.2 47.4% 11.2%;
                --destructive: 0 84.2% 60.2%;
                --destructive-foreground: 210 40% 98%;
                --border: 214.3 31.8% 91.4%;
                --input: 214.3 31.8% 91.4%;
                --ring: 222.2 84% 4.9%;
                --radius: 0.5rem;
            }
            .dark {
                --background: 222.2 84% 4.9%;
                --foreground: 210 40% 98%;
                --card: 222.2 84% 4.9%;
                --card-foreground: 210 40% 98%;
                --popover: 222.2 84% 4.9%;
                --popover-foreground: 210 40% 98%;
                --primary: 210 40% 98%;
                --primary-foreground: 222.2 47.4% 11.2%;
                --secondary: 217.2 32.6% 17.5%;
                --secondary-foreground: 210 40% 98%;
                --muted: 217.2 32.6% 17.5%;
                --muted-foreground: 215 20.2% 65.1%;
                --accent: 217.2 32.6% 17.5%;
                --accent-foreground: 210 40% 98%;
                --destructive: 0 62.8% 30.6%;
                --destructive-foreground: 210 40% 98%;
                --border: 217.2 32.6% 17.5%;
                --input: 217.2 32.6% 17.5%;
                --ring: 212.7 26.8% 83.9%;
            }
        </style>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: ["class"],
                theme: {
                    container: {
                        center: true,
                        padding: "2rem",
                        screens: {
                            "2xl": "1400px",
                        },
                    },
                    extend: {
                        colors: {
                            border: "hsl(var(--border))",
                            input: "hsl(var(--input))",
                            ring: "hsl(var(--ring))",
                            background: "hsl(var(--background))",
                            foreground: "hsl(var(--foreground))",
                            primary: {
                                DEFAULT: "hsl(var(--primary))",
                                foreground: "hsl(var(--primary-foreground))",
                            },
                            secondary: {
                                DEFAULT: "hsl(var(--secondary))",
                                foreground: "hsl(var(--secondary-foreground))",
                            },
                            destructive: {
                                DEFAULT: "hsl(var(--destructive))",
                                foreground: "hsl(var(--destructive-foreground))",
                            },
                            muted: {
                                DEFAULT: "hsl(var(--muted))",
                                foreground: "hsl(var(--muted-foreground))",
                            },
                            accent: {
                                DEFAULT: "hsl(var(--accent))",
                                foreground: "hsl(var(--accent-foreground))",
                            },
                            popover: {
                                DEFAULT: "hsl(var(--popover))",
                                foreground: "hsl(var(--popover-foreground))",
                            },
                            card: {
                                DEFAULT: "hsl(var(--card))",
                                foreground: "hsl(var(--card-foreground))",
                            },
                        },
                        borderRadius: {
                            lg: "var(--radius)",
                            md: "calc(var(--radius) - 2px)",
                            sm: "calc(var(--radius) - 4px)",
                        },
                    },
                },
            }
        </script>

        <!-- Load React only -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

        <script>
            // Ensure React and ReactDOM are globally available
            if (!window.React || !window.ReactDOM) {
               throw new Error('React or ReactDOM not loaded');
            }

            window.React = React;
            window.ReactDOM = ReactDOM;
            window.createPortal = ReactDOM.createPortal;
        </script>
    </head>
    <body class="bg-background text-foreground">
        <div id="root"></div>
        <script>
            var App = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // react-globals:react
  var require_react = __commonJS({
    "react-globals:react"(exports, module) {
      module.exports = window.React;
    }
  });

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => App
  });
  var import_react3 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    (_a, ref) => {
      var _b = _a, {
        color = "currentColor",
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className = "",
        children,
        iconNode
      } = _b, rest = __objRest(_b, [
        "color",
        "size",
        "strokeWidth",
        "absoluteStrokeWidth",
        "className",
        "children",
        "iconNode"
      ]);
      return (0, import_react.createElement)(
        "svg",
        __spreadValues(__spreadValues(__spreadProps(__spreadValues({
          ref
        }, defaultAttributes), {
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          className: mergeClasses("lucide", className)
        }), !children && !hasA11yProp(rest) && { "aria-hidden": "true" }), rest),
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      (_a, ref) => {
        var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
        return (0, import_react2.createElement)(Icon, __spreadValues({
          ref,
          iconNode,
          className: mergeClasses(
            `lucide-${toKebabCase(toPascalCase(iconName))}`,
            `lucide-${iconName}`,
            className
          )
        }, props));
      }
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/briefcase.js
  var __iconNode = [
    ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
    ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
  ];
  var Briefcase = createLucideIcon("briefcase", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/building-2.js
  var __iconNode2 = [
    ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
    ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
    ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
    ["path", { d: "M10 6h4", key: "1itunk" }],
    ["path", { d: "M10 10h4", key: "tcdvrf" }],
    ["path", { d: "M10 14h4", key: "kelpxr" }],
    ["path", { d: "M10 18h4", key: "1ulq68" }]
  ];
  var Building2 = createLucideIcon("building-2", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/check.js
  var __iconNode3 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/chevron-right.js
  var __iconNode4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("chevron-right", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/circle-alert.js
  var __iconNode5 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ];
  var CircleAlert = createLucideIcon("circle-alert", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/circle-check.js
  var __iconNode6 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var CircleCheck = createLucideIcon("circle-check", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/circle-x.js
  var __iconNode7 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }]
  ];
  var CircleX = createLucideIcon("circle-x", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/clock.js
  var __iconNode8 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
  ];
  var Clock = createLucideIcon("clock", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/cloud-upload.js
  var __iconNode9 = [
    ["path", { d: "M12 13v8", key: "1l5pq0" }],
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
    ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
  ];
  var CloudUpload = createLucideIcon("cloud-upload", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/compass.js
  var __iconNode10 = [
    [
      "path",
      {
        d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
        key: "9ktpf1"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
  ];
  var Compass = createLucideIcon("compass", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/copy.js
  var __iconNode11 = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  var Copy = createLucideIcon("copy", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/external-link.js
  var __iconNode12 = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  var ExternalLink = createLucideIcon("external-link", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js
  var __iconNode13 = [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M8 13h2", key: "yr2amv" }],
    ["path", { d: "M14 13h2", key: "un5t4a" }],
    ["path", { d: "M8 17h2", key: "2yhykz" }],
    ["path", { d: "M14 17h2", key: "10kma7" }]
  ];
  var FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/file-text.js
  var __iconNode14 = [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ];
  var FileText = createLucideIcon("file-text", __iconNode14);

  // node_modules/lucide-react/dist/esm/icons/folder-open.js
  var __iconNode15 = [
    [
      "path",
      {
        d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
        key: "usdka0"
      }
    ]
  ];
  var FolderOpen = createLucideIcon("folder-open", __iconNode15);

  // node_modules/lucide-react/dist/esm/icons/hard-hat.js
  var __iconNode16 = [
    ["path", { d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5", key: "1p9q5i" }],
    ["path", { d: "M14 6a6 6 0 0 1 6 6v3", key: "1hnv84" }],
    ["path", { d: "M4 15v-3a6 6 0 0 1 6-6", key: "9ciidu" }],
    ["rect", { x: "2", y: "15", width: "20", height: "4", rx: "1", key: "g3x8cw" }]
  ];
  var HardHat = createLucideIcon("hard-hat", __iconNode16);

  // node_modules/lucide-react/dist/esm/icons/image.js
  var __iconNode17 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ];
  var Image = createLucideIcon("image", __iconNode17);

  // node_modules/lucide-react/dist/esm/icons/layers.js
  var __iconNode18 = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo"
      }
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc"
      }
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6"
      }
    ]
  ];
  var Layers = createLucideIcon("layers", __iconNode18);

  // node_modules/lucide-react/dist/esm/icons/mail.js
  var __iconNode19 = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
  ];
  var Mail = createLucideIcon("mail", __iconNode19);

  // node_modules/lucide-react/dist/esm/icons/map-pin.js
  var __iconNode20 = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
  ];
  var MapPin = createLucideIcon("map-pin", __iconNode20);

  // node_modules/lucide-react/dist/esm/icons/message-square.js
  var __iconNode21 = [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
  ];
  var MessageSquare = createLucideIcon("message-square", __iconNode21);

  // node_modules/lucide-react/dist/esm/icons/pen-line.js
  var __iconNode22 = [
    ["path", { d: "M12 20h9", key: "t2du7b" }],
    [
      "path",
      {
        d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
        key: "1ykcvy"
      }
    ]
  ];
  var PenLine = createLucideIcon("pen-line", __iconNode22);

  // node_modules/lucide-react/dist/esm/icons/plus.js
  var __iconNode23 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode23);

  // node_modules/lucide-react/dist/esm/icons/printer.js
  var __iconNode24 = [
    [
      "path",
      {
        d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
        key: "143wyd"
      }
    ],
    ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
    ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
  ];
  var Printer = createLucideIcon("printer", __iconNode24);

  // node_modules/lucide-react/dist/esm/icons/save.js
  var __iconNode25 = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476"
      }
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
  ];
  var Save = createLucideIcon("save", __iconNode25);

  // node_modules/lucide-react/dist/esm/icons/search.js
  var __iconNode26 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode26);

  // node_modules/lucide-react/dist/esm/icons/shield-alert.js
  var __iconNode27 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "M12 8v4", key: "1got3b" }],
    ["path", { d: "M12 16h.01", key: "1drbdi" }]
  ];
  var ShieldAlert = createLucideIcon("shield-alert", __iconNode27);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode28 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode28);

  // node_modules/lucide-react/dist/esm/icons/wrench.js
  var __iconNode29 = [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        key: "cbrjhi"
      }
    ]
  ];
  var Wrench = createLucideIcon("wrench", __iconNode29);

  // node_modules/lucide-react/dist/esm/icons/zap.js
  var __iconNode30 = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db"
      }
    ]
  ];
  var Zap = createLucideIcon("zap", __iconNode30);

  // <stdin>
  function App() {
    const [projectInfo, setProjectInfo] = (0, import_react3.useState)(() => {
      const saved = localStorage.getItem("iso_project_info");
      return saved ? JSON.parse(saved) : {
        projectName: "High-Rise Commercial Tower Block B",
        client: "Apex Global Developments",
        consultant: "Vertex Engineering Consultants",
        contractor: "BuildCorp International Contracting",
        location: "Plot 402, Central Business District",
        projectCode: "PRJ1"
      };
    });
    const [isEditingInfo, setIsEditingInfo] = (0, import_react3.useState)(false);
    const [activeModule, setActiveModule] = (0, import_react3.useState)("Submittals Log");
    (0, import_react3.useEffect)(() => {
      localStorage.setItem("iso_project_info", JSON.stringify(projectInfo));
    }, [projectInfo]);
    const DOCUMENT_TYPES = [
      { label: "\u{1F4CB} Submittals Log", value: "Submittals Log", code: "SUB" },
      { label: "\u{1F4E6} Transmittals Log", value: "Transmittals Log", code: "TRN" },
      { label: "\u{1F50D} Inspection Request / MIR", value: "Inspection Request / MIR", code: "MIR" },
      { label: "\u2705 Site Checklist", value: "Site Checklist", code: "CHK" },
      { label: "\u2753 RFI - Request for Information", value: "RFI / Request for Information", code: "RFI" },
      { label: "\u{1F4C4} Method Statement (RAMS)", value: "Method Statement", code: "MST" },
      { label: "\u{1F4D0} Shop Drawing", value: "Shop Drawing", code: "SDW" },
      { label: "\u{1F9F1} Material Approval (MAR)", value: "Material Approval", code: "MAR" },
      { label: "\u{1F4D1} MCR - Material Compliance Report", value: "Material Compliance Report (MCR)", code: "MCR" },
      { label: "\u{1F9EA} ST - Structural / Sample Test Report", value: "Structural Test Report (ST)", code: "ST" },
      { label: "\u{1F3DB}\uFE0F ACR - Architectural Compliance Report", value: "Architectural Compliance Report (ACR)", code: "ACR" },
      { label: "\u{1F4DD} MOM - Minutes of Meeting", value: "Minutes of Meeting (MOM)", code: "MOM" },
      { label: "\u2699\uFE0F TS - Technical Submittal / Spec", value: "Technical Submittal (TS)", code: "TS" },
      { label: "\u{1F4C5} DPR - Daily Progress Report", value: "Daily Progress Report (DPR)", code: "DPR" },
      { label: "\u{1F396}\uFE0F CCC - Completion & Commissioning Certificate", value: "Completion Certificate (CCC)", code: "CCC" },
      { label: "\u{1F4CA} CCSR - Client & Consultant Status Register", value: "Client & Consultant Status Register (CCSR)", code: "CCSR" },
      { label: "\u{1F4C8} CCSRPS - Client/Consultant Progress Summary", value: "Client/Consultant Progress Summary (CCSRPS)", code: "CCSRPS" },
      { label: "\u26A0\uFE0F Field Change Order / Variance", value: "Field Change Order", code: "FCO" }
    ];
    const getTypeIsoCode = (moduleVal) => {
      const found = DOCUMENT_TYPES.find((d) => d.value === moduleVal);
      return found ? found.code : "SUB";
    };
    const [entries, setEntries] = (0, import_react3.useState)(() => {
      const saved = localStorage.getItem("iso_register_entries");
      return saved ? JSON.parse(saved) : [
        {
          id: "PRJ1-CON-Z1-CV-SUB-0001",
          title: "Ground Floor Structural & Civil Footing Plan",
          module: "Submittals Log",
          originator: "CON",
          zone: "Z1",
          disciplines: ["Civil", "Structure"],
          rev: "Rev 0",
          status: "Approved (Code A)",
          date: "2026-11-01",
          author: "BuildCorp Civil Team",
          recipient: "Vertex Structural Eng",
          drawingNo: "DWG-CV-1001",
          drawingTitle: "Foundation Layout Plan",
          boqRef: "BOQ Item 2.1.4",
          specRef: "Spec Sec 03300",
          itemDescription: "Detailed structural calculation and footing plan for Zone 1.",
          enclosures: "2 x A1 Prints, 1 x Calculation Sheet",
          submissionFormat: { hardCopy: true, softCopy: true },
          attachment: { name: "Ground_Floor_Plan_Rev0.pdf", type: "application/pdf", size: "4.2 MB", url: "#" },
          comments: "Approved without reservations."
        },
        {
          id: "PRJ1-CON-Z1-EL-MIR-0002",
          title: "Electrical Substation Transformer Panel Inspection",
          module: "Inspection Request / MIR",
          originator: "CON",
          zone: "Z1",
          disciplines: ["Electrical"],
          rev: "Rev 1",
          status: "Approved as Noted (Code B)",
          date: "2026-11-03",
          author: "MEP Subcontractor",
          recipient: "Vertex Electrical Inspector",
          drawingNo: "DWG-EL-3004",
          drawingTitle: "Transformer Single Line Diagram",
          boqRef: "BOQ Item 4.2.1",
          specRef: "Spec Sec 16100",
          itemDescription: "Site material inspection request for 11kV transformer panel.",
          enclosures: "Factory Acceptance Test (FAT) Certificate",
          submissionFormat: { hardCopy: false, softCopy: true },
          attachment: { name: "Transformer_FAT_Cert.pdf", type: "application/pdf", size: "1.8 MB", url: "#" },
          comments: "Ensure earth pit grounding resistance test is completed prior to energization."
        }
      ];
    });
    (0, import_react3.useEffect)(() => {
      localStorage.setItem("iso_register_entries", JSON.stringify(entries));
    }, [entries]);
    const handleBackupToDriveOrFile = () => {
      const backupData = {
        projectInfo,
        entries,
        exportDate: (/* @__PURE__ */ new Date()).toISOString()
      };
      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ISO19650_Backup_${projectInfo.projectCode}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const handleRestoreBackup = (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file)
        return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.projectInfo)
            setProjectInfo(parsed.projectInfo);
          if (parsed.entries)
            setEntries(parsed.entries);
          alert("Data backup successfully restored!");
        } catch (err) {
          alert("Invalid JSON backup file.");
        }
      };
      reader.readAsText(file);
    };
    const AVAILABLE_DISCIPLINES = [
      "Civil",
      "Survey",
      "Architecture",
      "Structure",
      "Lift",
      "Plumbing & Drainage",
      "HVAC",
      "Electrical",
      "Infrastructure",
      "Others"
    ];
    const getDisciplineCode = (disc) => {
      switch (disc) {
        case "Civil":
          return "CV";
        case "Architecture":
          return "AR";
        case "Structure":
          return "ST";
        case "Survey":
          return "SU";
        case "Lift":
          return "LF";
        case "Plumbing & Drainage":
          return "PD";
        case "HVAC":
          return "HV";
        case "Electrical":
          return "EL";
        case "Infrastructure":
          return "IN";
        default:
          return "GN";
      }
    };
    const [counters, setCounters] = (0, import_react3.useState)({
      "Submittals Log": 5,
      "Transmittals Log": 3,
      "Inspection Request / MIR": 4,
      "Site Checklist": 3,
      "RFI / Request for Information": 3,
      "Method Statement": 2,
      "Shop Drawing": 6,
      "Material Approval": 2,
      "Material Compliance Report (MCR)": 1,
      "Structural Test Report (ST)": 1,
      "Architectural Compliance Report (ACR)": 1,
      "Minutes of Meeting (MOM)": 1,
      "Technical Submittal (TS)": 1,
      "Daily Progress Report (DPR)": 1,
      "Completion Certificate (CCC)": 1,
      "Client & Consultant Status Register (CCSR)": 1,
      "Client/Consultant Progress Summary (CCSRPS)": 1,
      "Field Change Order": 1
    });
    const [reportModalOpen, setReportModalOpen] = (0, import_react3.useState)(false);
    const [reportTimeframe, setReportTimeframe] = (0, import_react3.useState)("Weekly");
    const [copiedLink, setCopiedLink] = (0, import_react3.useState)(false);
    const [isFormOpen, setIsFormOpen] = (0, import_react3.useState)(false);
    const [searchQuery, setSearchQuery] = (0, import_react3.useState)("");
    const [selectedDisciplineFilter, setSelectedDisciplineFilter] = (0, import_react3.useState)("All");
    const [selectedStatus, setSelectedStatus] = (0, import_react3.useState)("All");
    const [selectedEntry, setSelectedEntry] = (0, import_react3.useState)(null);
    const [formData, setFormData] = (0, import_react3.useState)({
      originatorCode: "CON",
      zoneCode: "Z1",
      title: "",
      disciplines: ["Civil"],
      rev: "Rev 0",
      status: "Under Review",
      author: "Main Contractor Team",
      recipient: "Lead Consultant",
      drawingNo: "",
      drawingTitle: "",
      boqRef: "",
      specRef: "",
      itemDescription: "",
      enclosures: "",
      submissionFormat: { hardCopy: true, softCopy: true },
      comments: ""
    });
    const [attachmentMode, setAttachmentMode] = (0, import_react3.useState)("file");
    const [uploadedFile, setUploadedFile] = (0, import_react3.useState)(null);
    const [externalUrl, setExternalUrl] = (0, import_react3.useState)("");
    const previewIsoCode = (0, import_react3.useMemo)(() => {
      const proj = projectInfo.projectCode || "PRJ";
      const orig = formData.originatorCode || "CON";
      const zone = formData.zoneCode || "Z1";
      const primaryDisc = formData.disciplines.length > 0 ? getDisciplineCode(formData.disciplines[0]) : "GN";
      const typeCode = getTypeIsoCode(activeModule);
      const seq = String(counters[activeModule] || 1).padStart(4, "0");
      return `${proj}-${orig}-${zone}-${primaryDisc}-${typeCode}-${seq}`;
    }, [projectInfo.projectCode, formData.originatorCode, formData.zoneCode, formData.disciplines, activeModule, counters]);
    const handleAddEntry = (e) => {
      e.preventDefault();
      if (!formData.title || formData.disciplines.length === 0)
        return;
      let attachmentObj = null;
      if (attachmentMode === "file" && uploadedFile) {
        attachmentObj = {
          name: uploadedFile.name,
          type: uploadedFile.type,
          size: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`,
          url: URL.createObjectURL(uploadedFile)
        };
      } else if (attachmentMode === "link" && externalUrl) {
        attachmentObj = {
          name: externalUrl,
          type: "url",
          size: "External Cloud Link",
          url: externalUrl
        };
      }
      const newRecord = {
        id: previewIsoCode,
        title: formData.title,
        module: activeModule,
        originator: formData.originatorCode,
        zone: formData.zoneCode,
        disciplines: formData.disciplines,
        rev: formData.rev,
        status: formData.status,
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        author: formData.author,
        recipient: formData.recipient,
        drawingNo: formData.drawingNo,
        drawingTitle: formData.drawingTitle,
        boqRef: formData.boqRef,
        specRef: formData.specRef,
        itemDescription: formData.itemDescription,
        enclosures: formData.enclosures,
        submissionFormat: formData.submissionFormat,
        attachment: attachmentObj,
        comments: formData.comments
      };
      setEntries([newRecord, ...entries]);
      setCounters((prev) => __spreadProps(__spreadValues({}, prev), {
        [activeModule]: (prev[activeModule] || 1) + 1
      }));
      setFormData({
        originatorCode: "CON",
        zoneCode: "Z1",
        title: "",
        disciplines: ["Civil"],
        rev: "Rev 0",
        status: "Under Review",
        author: "Main Contractor Team",
        recipient: "Lead Consultant",
        drawingNo: "",
        drawingTitle: "",
        boqRef: "",
        specRef: "",
        itemDescription: "",
        enclosures: "",
        submissionFormat: { hardCopy: true, softCopy: true },
        comments: ""
      });
      setUploadedFile(null);
      setExternalUrl("");
      setIsFormOpen(false);
    };
    const toggleFormDiscipline = (disc) => {
      setFormData((prev) => {
        const exists = prev.disciplines.includes(disc);
        if (exists) {
          if (prev.disciplines.length === 1)
            return prev;
          return __spreadProps(__spreadValues({}, prev), { disciplines: prev.disciplines.filter((d) => d !== disc) });
        } else {
          return __spreadProps(__spreadValues({}, prev), { disciplines: [...prev.disciplines, disc] });
        }
      });
    };
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setUploadedFile(e.target.files[0]);
      }
    };
    const filteredEntries = (0, import_react3.useMemo)(() => {
      return entries.filter((item) => {
        if (item.module !== activeModule)
          return false;
        const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.drawingNo && item.drawingNo.toLowerCase().includes(searchQuery.toLowerCase()) || item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDiscipline = selectedDisciplineFilter === "All" || item.disciplines.includes(selectedDisciplineFilter);
        const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
        return matchesSearch && matchesDiscipline && matchesStatus;
      });
    }, [entries, activeModule, searchQuery, selectedDisciplineFilter, selectedStatus]);
    const statusCounts = (0, import_react3.useMemo)(() => {
      const moduleEntries = entries.filter((e) => e.module === activeModule);
      const codeA = moduleEntries.filter((e) => e.status.includes("Code A")).length;
      const codeB = moduleEntries.filter((e) => e.status.includes("Code B")).length;
      const codeC = moduleEntries.filter((e) => e.status.includes("Code C")).length;
      const codeD = moduleEntries.filter((e) => e.status.includes("Code D")).length;
      const underReview = moduleEntries.filter((e) => e.status === "Under Review").length;
      const total = moduleEntries.length;
      return { codeA, codeB, codeC, codeD, underReview, total };
    }, [entries, activeModule]);
    const donutSegments = (0, import_react3.useMemo)(() => {
      const total = statusCounts.total || 1;
      const circumference = 2 * Math.PI * 40;
      const segments = [
        { key: "Code A", count: statusCounts.codeA, color: "#10b981" },
        { key: "Code B", count: statusCounts.codeB, color: "#f59e0b" },
        { key: "Code C", count: statusCounts.codeC, color: "#f43f5e" },
        { key: "Code D", count: statusCounts.codeD, color: "#e11d48" },
        { key: "Review", count: statusCounts.underReview, color: "#0284c7" }
      ];
      let accumulatedOffset = 0;
      return segments.map((seg) => {
        const strokeLength = seg.count / total * circumference;
        const dasharray = `${strokeLength} ${circumference - strokeLength}`;
        const dashoffset = -accumulatedOffset;
        accumulatedOffset += strokeLength;
        return __spreadProps(__spreadValues({}, seg), {
          dasharray,
          dashoffset,
          percent: Math.round(seg.count / total * 100)
        });
      });
    }, [statusCounts]);
    const getStatusBadge = (status) => {
      if (status.includes("Code A")) {
        return { style: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: /* @__PURE__ */ import_react3.default.createElement(CircleCheck, { className: "w-3.5 h-3.5 mr-1 text-emerald-600" }) };
      }
      if (status.includes("Code B")) {
        return { style: "bg-amber-100 text-amber-800 border-amber-300", icon: /* @__PURE__ */ import_react3.default.createElement(CircleAlert, { className: "w-3.5 h-3.5 mr-1 text-amber-600" }) };
      }
      if (status.includes("Code C")) {
        return { style: "bg-rose-100 text-rose-800 border-rose-300", icon: /* @__PURE__ */ import_react3.default.createElement(ShieldAlert, { className: "w-3.5 h-3.5 mr-1 text-rose-600" }) };
      }
      if (status.includes("Code D")) {
        return { style: "bg-red-200 text-red-900 border-red-400 font-bold", icon: /* @__PURE__ */ import_react3.default.createElement(CircleX, { className: "w-3.5 h-3.5 mr-1 text-red-700" }) };
      }
      return { style: "bg-sky-100 text-sky-800 border-sky-300", icon: /* @__PURE__ */ import_react3.default.createElement(Clock, { className: "w-3.5 h-3.5 mr-1 text-sky-600" }) };
    };
    const getDisciplineIcon = (disc) => {
      switch (disc) {
        case "Civil":
          return /* @__PURE__ */ import_react3.default.createElement(HardHat, { className: "w-3.5 h-3.5 text-amber-600" });
        case "Architecture":
          return /* @__PURE__ */ import_react3.default.createElement(Building2, { className: "w-3.5 h-3.5 text-blue-600" });
        case "Structure":
          return /* @__PURE__ */ import_react3.default.createElement(Layers, { className: "w-3.5 h-3.5 text-indigo-600" });
        case "Electrical":
          return /* @__PURE__ */ import_react3.default.createElement(Zap, { className: "w-3.5 h-3.5 text-amber-500" });
        case "HVAC":
          return /* @__PURE__ */ import_react3.default.createElement(Compass, { className: "w-3.5 h-3.5 text-cyan-600" });
        case "Plumbing & Drainage":
          return /* @__PURE__ */ import_react3.default.createElement(Wrench, { className: "w-3.5 h-3.5 text-teal-600" });
        default:
          return /* @__PURE__ */ import_react3.default.createElement(Briefcase, { className: "w-3.5 h-3.5 text-slate-500" });
      }
    };
    const getAttachmentIcon = (type) => {
      if (type === "url")
        return /* @__PURE__ */ import_react3.default.createElement(ExternalLink, { className: "w-4 h-4 text-blue-500" });
      if (type == null ? void 0 : type.includes("image"))
        return /* @__PURE__ */ import_react3.default.createElement(Image, { className: "w-4 h-4 text-emerald-500" });
      return /* @__PURE__ */ import_react3.default.createElement(FileText, { className: "w-4 h-4 text-red-500" });
    };
    const reportShareText = (0, import_react3.useMemo)(() => {
      const list = filteredEntries.map((e) => `\u2022 [${e.id}] (${e.rev}) ${e.title} - ${e.status}`).join("\n");
      return `\u{1F4CA} ISO 19650 REGISTER REPORT (${reportTimeframe.toUpperCase()})
Project: ${projectInfo.projectName} (${projectInfo.projectCode})
Client: ${projectInfo.client} | Consultant: ${projectInfo.consultant} | Contractor: ${projectInfo.contractor}
Module: ${activeModule}

\u{1F4CC} SUMMARY KPI METRICS:
Total Logged: ${statusCounts.total}
Approved (Code A): ${statusCounts.codeA}
Approved as Noted (Code B): ${statusCounts.codeB}
Resubmit / Revise (Code C): ${statusCounts.codeC}
Closed / Rejected (Code D): ${statusCounts.codeD}
Under Review: ${statusCounts.underReview}

\u{1F4DD} DOCUMENT REGISTER SUMMARY:
${list || "No items recorded for this timeframe."}`;
    }, [filteredEntries, activeModule, reportTimeframe, projectInfo, statusCounts]);
    const handleCopyShareLink = () => {
      navigator.clipboard.writeText(reportShareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2e3);
    };
    const handlePrintPDF = () => {
      window.print();
    };
    const handleExportToExcel = () => {
      const headers = [
        "ISO Serial Number",
        "Module / Register Type",
        "Revision",
        "Date",
        "Title / Subject",
        "Disciplines",
        "Status",
        "Originator",
        "Zone",
        "Author",
        "Recipient",
        "Drawing Number",
        "Drawing Title",
        "BOQ Item Ref",
        "Spec Section Ref",
        "Submission Format",
        "Enclosures",
        "Item Scope / Description",
        "Remarks"
      ];
      const csvRows = filteredEntries.map((item) => {
        var _a, _b;
        const formatStr = `${((_a = item.submissionFormat) == null ? void 0 : _a.hardCopy) ? "Hard Copy" : ""} ${((_b = item.submissionFormat) == null ? void 0 : _b.softCopy) ? "Soft Copy" : ""}`.trim();
        return [
          `"${item.id}"`,
          `"${item.module}"`,
          `"${item.rev}"`,
          `"${item.date}"`,
          `"${(item.title || "").replace(/"/g, '""')}"`,
          `"${(item.disciplines || []).join(", ")}"`,
          `"${item.status}"`,
          `"${item.originator || ""}"`,
          `"${item.zone || ""}"`,
          `"${(item.author || "").replace(/"/g, '""')}"`,
          `"${(item.recipient || "").replace(/"/g, '""')}"`,
          `"${item.drawingNo || ""}"`,
          `"${(item.drawingTitle || "").replace(/"/g, '""')}"`,
          `"${item.boqRef || ""}"`,
          `"${item.specRef || ""}"`,
          `"${formatStr}"`,
          `"${(item.enclosures || "").replace(/"/g, '""')}"`,
          `"${(item.itemDescription || "").replace(/"/g, '""')}"`,
          `"${(item.comments || "").replace(/"/g, '""')}"`
        ].join(",");
      });
      const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...csvRows].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      const fileName = `${projectInfo.projectCode}_${activeModule.replace(/[^a-zA-Z0-9]/g, "_")}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const getItemShareText = (item) => {
      var _a;
      return `\u{1F4C4} DOCUMENT ITEM DETAILS
ISO No: ${item.id} (${item.rev})
Title: ${item.title}
Module: ${item.module}
Disciplines: ${(_a = item.disciplines) == null ? void 0 : _a.join(", ")}
Status: ${item.status}
Date: ${item.date}
Drawing No: ${item.drawingNo || "N/A"} - ${item.drawingTitle || "N/A"}
BOQ Ref: ${item.boqRef || "N/A"} | Spec Ref: ${item.specRef || "N/A"}
Project: ${projectInfo.projectName}`;
    };
    const handleExportItemToExcel = (item) => {
      var _a, _b;
      const headers = [
        "ISO Serial Number",
        "Module / Register Type",
        "Revision",
        "Date",
        "Title / Subject",
        "Disciplines",
        "Status",
        "Originator",
        "Zone",
        "Author",
        "Recipient",
        "Drawing Number",
        "Drawing Title",
        "BOQ Item Ref",
        "Spec Section Ref",
        "Submission Format",
        "Enclosures",
        "Item Scope / Description",
        "Remarks"
      ];
      const formatStr = `${((_a = item.submissionFormat) == null ? void 0 : _a.hardCopy) ? "Hard Copy" : ""} ${((_b = item.submissionFormat) == null ? void 0 : _b.softCopy) ? "Soft Copy" : ""}`.trim();
      const csvRow = [
        `"${item.id}"`,
        `"${item.module}"`,
        `"${item.rev}"`,
        `"${item.date}"`,
        `"${(item.title || "").replace(/"/g, '""')}"`,
        `"${(item.disciplines || []).join(", ")}"`,
        `"${item.status}"`,
        `"${item.originator || ""}"`,
        `"${item.zone || ""}"`,
        `"${(item.author || "").replace(/"/g, '""')}"`,
        `"${(item.recipient || "").replace(/"/g, '""')}"`,
        `"${item.drawingNo || ""}"`,
        `"${(item.drawingTitle || "").replace(/"/g, '""')}"`,
        `"${item.boqRef || ""}"`,
        `"${item.specRef || ""}"`,
        `"${formatStr}"`,
        `"${(item.enclosures || "").replace(/"/g, '""')}"`,
        `"${(item.itemDescription || "").replace(/"/g, '""')}"`,
        `"${(item.comments || "").replace(/"/g, '""')}"`
      ].join(",");
      const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), csvRow].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      const fileName = `${item.id}_Details.csv`;
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const handlePrintItemPDF = (item) => {
      setSelectedEntry(item);
      setTimeout(() => {
        window.print();
      }, 300);
    };
    const handleShareItemEmail = (item) => {
      const subject = encodeURIComponent(`Document Ref: ${item.id} - ${item.title}`);
      const body = encodeURIComponent(getItemShareText(item));
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };
    const handleCopyItemTeams = (item) => {
      navigator.clipboard.writeText(getItemShareText(item));
      alert(`Item details copied for MS Teams sharing:

${item.id}`);
    };
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "min-h-screen bg-slate-50 p-3 sm:p-6 text-slate-800 font-sans" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "max-w-7xl mx-auto space-y-6" }, /* @__PURE__ */ import_react3.default.createElement("header", { className: "bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-800" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-slate-800 pb-5" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2 mb-1 flex-wrap" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider" }, "ISO 19650 Standard"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 text-xs font-mono" }, projectInfo.projectCode), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setIsEditingInfo(!isEditingInfo),
        className: "inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-md transition border border-slate-700"
      },
      /* @__PURE__ */ import_react3.default.createElement(PenLine, { className: "w-3 h-3" }),
      /* @__PURE__ */ import_react3.default.createElement("span", null, isEditingInfo ? "Close Edit" : "Edit Project Info")
    )), isEditingInfo ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-slate-400 text-[10px] uppercase font-bold mb-0.5" }, "Project Name"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: projectInfo.projectName,
        onChange: (e) => setProjectInfo(__spreadProps(__spreadValues({}, projectInfo), { projectName: e.target.value })),
        className: "w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-slate-400 text-[10px] uppercase font-bold mb-0.5" }, "Project Code"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: projectInfo.projectCode,
        onChange: (e) => setProjectInfo(__spreadProps(__spreadValues({}, projectInfo), { projectCode: e.target.value.toUpperCase() })),
        className: "w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-slate-400 text-[10px] uppercase font-bold mb-0.5" }, "Client"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: projectInfo.client,
        onChange: (e) => setProjectInfo(__spreadProps(__spreadValues({}, projectInfo), { client: e.target.value })),
        className: "w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-slate-400 text-[10px] uppercase font-bold mb-0.5" }, "Consultant"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: projectInfo.consultant,
        onChange: (e) => setProjectInfo(__spreadProps(__spreadValues({}, projectInfo), { consultant: e.target.value })),
        className: "w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-slate-400 text-[10px] uppercase font-bold mb-0.5" }, "Contractor"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: projectInfo.contractor,
        onChange: (e) => setProjectInfo(__spreadProps(__spreadValues({}, projectInfo), { contractor: e.target.value })),
        className: "w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-slate-400 text-[10px] uppercase font-bold mb-0.5" }, "Location"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: projectInfo.location,
        onChange: (e) => setProjectInfo(__spreadProps(__spreadValues({}, projectInfo), { location: e.target.value })),
        className: "w-full bg-slate-900 border border-slate-700 text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      }
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setIsEditingInfo(false),
        className: "bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1 rounded-lg text-xs flex items-center gap-1"
      },
      /* @__PURE__ */ import_react3.default.createElement(Check, { className: "w-3.5 h-3.5" }),
      " Save Header Info"
    ))) : /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("h1", { className: "text-xl sm:text-2xl font-black text-white tracking-tight" }, projectInfo.projectName), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-slate-400 text-xs sm:text-sm mt-1 flex items-center gap-1.5" }, /* @__PURE__ */ import_react3.default.createElement(MapPin, { className: "w-3.5 h-3.5 text-blue-400" }), projectInfo.location))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2 sm:gap-3 flex-wrap" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handleBackupToDriveOrFile,
        title: "Backup full database JSON file for local PC or Google Drive storage",
        className: "inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3 py-2 rounded-xl border border-slate-700 transition gap-1.5 text-xs sm:text-sm"
      },
      /* @__PURE__ */ import_react3.default.createElement(Save, { className: "w-4 h-4 text-sky-400" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Backup"),
      " Drive"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "label",
      {
        title: "Restore JSON Backup file",
        className: "inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3 py-2 rounded-xl border border-slate-700 transition gap-1.5 text-xs sm:text-sm cursor-pointer"
      },
      /* @__PURE__ */ import_react3.default.createElement(FolderOpen, { className: "w-4 h-4 text-amber-400" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Restore"),
      /* @__PURE__ */ import_react3.default.createElement("input", { type: "file", accept: ".json", onChange: handleRestoreBackup, className: "hidden" })
    ), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-slate-800 border border-slate-700 rounded-xl p-1 flex items-center" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs text-slate-400 px-2 font-medium hidden md:inline" }, "Type:"), /* @__PURE__ */ import_react3.default.createElement(
      "select",
      {
        value: activeModule,
        onChange: (e) => setActiveModule(e.target.value),
        className: "bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer border border-slate-700"
      },
      DOCUMENT_TYPES.map((type) => /* @__PURE__ */ import_react3.default.createElement("option", { key: type.value, value: type.value }, type.label))
    )), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handleExportToExcel,
        title: "Export register to MS Excel (.csv)",
        className: "inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-medium px-3.5 py-2 rounded-xl transition shadow-sm gap-1.5 text-xs sm:text-sm"
      },
      /* @__PURE__ */ import_react3.default.createElement(FileSpreadsheet, { className: "w-4 h-4 text-emerald-300" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Export"),
      " Excel"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setReportModalOpen(true),
        className: "inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium px-3.5 py-2 rounded-xl transition shadow-sm gap-1.5 text-xs sm:text-sm"
      },
      /* @__PURE__ */ import_react3.default.createElement(Printer, { className: "w-4 h-4" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Export"),
      " PDF / Share"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setIsFormOpen(!isFormOpen),
        className: "inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl transition shadow-sm gap-2 text-xs sm:text-sm"
      },
      /* @__PURE__ */ import_react3.default.createElement(Plus, { className: "w-4 h-4" }),
      /* @__PURE__ */ import_react3.default.createElement("span", { className: "hidden sm:inline" }, "Add"),
      " Record"
    )))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "relative w-24 h-24 shrink-0 flex items-center justify-center" }, /* @__PURE__ */ import_react3.default.createElement("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 100 100" }, /* @__PURE__ */ import_react3.default.createElement("circle", { cx: "50", cy: "50", r: "40", fill: "transparent", stroke: "#f1f5f9", strokeWidth: "16" }), donutSegments.map((seg) => /* @__PURE__ */ import_react3.default.createElement(
      "circle",
      {
        key: seg.key,
        cx: "50",
        cy: "50",
        r: "40",
        fill: "transparent",
        stroke: seg.color,
        strokeWidth: "16",
        strokeDasharray: seg.dasharray,
        strokeDashoffset: seg.dashoffset,
        className: "transition-all duration-500"
      }
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "absolute text-center" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "block text-xl font-black text-slate-800" }, statusCounts.total), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] text-slate-400 uppercase font-bold" }, "Total"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-1.5 text-xs flex-1" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1.5 text-slate-600 font-medium" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" }), " Code A (Appr)"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-800" }, statusCounts.codeA)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1.5 text-slate-600 font-medium" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" }), " Code B (Noted)"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-800" }, statusCounts.codeB)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1.5 text-slate-600 font-medium" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" }), " Code C (Revise)"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-800" }, statusCounts.codeC)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1.5 text-slate-600 font-medium" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-red-600 inline-block" }), " Code D (Reject)"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-800" }, statusCounts.codeD)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1.5 text-slate-600 font-medium" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" }), " Under Review"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-800" }, statusCounts.underReview)))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex flex-col justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs font-bold text-emerald-800 uppercase tracking-wide" }, "Approved (Code A)"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-2 flex items-baseline justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-2xl font-black text-emerald-700" }, statusCounts.codeA), /* @__PURE__ */ import_react3.default.createElement(CircleCheck, { className: "w-5 h-5 text-emerald-500" }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-amber-50/60 p-4 rounded-2xl border border-amber-100 flex flex-col justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs font-bold text-amber-800 uppercase tracking-wide" }, "Approved As Noted (B)"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-2 flex items-baseline justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-2xl font-black text-amber-700" }, statusCounts.codeB), /* @__PURE__ */ import_react3.default.createElement(CircleAlert, { className: "w-5 h-5 text-amber-500" }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-rose-50/60 p-4 rounded-2xl border border-rose-100 flex flex-col justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs font-bold text-rose-800 uppercase tracking-wide" }, "Revise / Rejected"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-2 flex items-baseline justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-2xl font-black text-rose-700" }, statusCounts.codeC + statusCounts.codeD), /* @__PURE__ */ import_react3.default.createElement(ShieldAlert, { className: "w-5 h-5 text-rose-500" }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-sky-50/60 p-4 rounded-2xl border border-sky-100 flex flex-col justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs font-bold text-sky-800 uppercase tracking-wide" }, "Under Review"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-2 flex items-baseline justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-2xl font-black text-sky-700" }, statusCounts.underReview), /* @__PURE__ */ import_react3.default.createElement(Clock, { className: "w-5 h-5 text-sky-500" }))))), isFormOpen && /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md animate-in slide-in-from-top duration-200 space-y-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-100 pb-3" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h2", { className: "text-base font-bold text-slate-800" }, "Add New Document Entry (", activeModule, ")"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-xs text-slate-500" }, "Auto ISO 19650 ID: ", /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-mono font-bold text-blue-600" }, previewIsoCode))), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setIsFormOpen(false),
        className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg"
      },
      /* @__PURE__ */ import_react3.default.createElement(X, { className: "w-5 h-5" })
    )), /* @__PURE__ */ import_react3.default.createElement("form", { onSubmit: handleAddEntry, className: "space-y-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Originator Code"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: formData.originatorCode,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { originatorCode: e.target.value.toUpperCase() })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none",
        placeholder: "CON / CLN / CSL"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Zone / Sector Code"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        value: formData.zoneCode,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { zoneCode: e.target.value.toUpperCase() })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none",
        placeholder: "Z1 / BLK-A"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Revision Code"), /* @__PURE__ */ import_react3.default.createElement(
      "select",
      {
        value: formData.rev,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { rev: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      },
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Rev 0" }, "Rev 0 (Initial)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Rev 1" }, "Rev 1"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Rev 2" }, "Rev 2"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Rev 3" }, "Rev 3")
    ))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-xs font-semibold text-slate-700 mb-1" }, "Document Title & Description *"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        required: true,
        placeholder: "e.g., Substation Foundation Reinforcement Drawing Sheet 1...",
        value: formData.title,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { title: e.target.value })),
        className: "w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block text-xs font-semibold text-slate-700 mb-1.5" }, "Select Disciplines (Multiple) *"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-wrap gap-2" }, AVAILABLE_DISCIPLINES.map((disc) => {
      const isSelected = formData.disciplines.includes(disc);
      return /* @__PURE__ */ import_react3.default.createElement(
        "button",
        {
          type: "button",
          key: disc,
          onClick: () => toggleFormDiscipline(disc),
          className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${isSelected ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`
        },
        getDisciplineIcon(disc),
        disc,
        isSelected && /* @__PURE__ */ import_react3.default.createElement(Check, { className: "w-3.5 h-3.5 ml-1 text-white" })
      );
    }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Drawing Number"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "e.g. DWG-CV-101",
        value: formData.drawingNo,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { drawingNo: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Drawing Title"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "e.g. Layout Plan",
        value: formData.drawingTitle,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { drawingTitle: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "BOQ Item Ref"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "e.g. BOQ Item 3.2.1",
        value: formData.boqRef,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { boqRef: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Specification Ref"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "e.g. Spec Sec 03300",
        value: formData.specRef,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { specRef: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
      }
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700" }, "Submission Format"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "flex items-center gap-2 cursor-pointer" }, /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: formData.submissionFormat.hardCopy,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), {
          submissionFormat: __spreadProps(__spreadValues({}, formData.submissionFormat), { hardCopy: e.target.checked })
        })),
        className: "rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
      }
    ), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-medium text-slate-700" }, "Hard Copy")), /* @__PURE__ */ import_react3.default.createElement("label", { className: "flex items-center gap-2 cursor-pointer" }, /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: formData.submissionFormat.softCopy,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), {
          submissionFormat: __spreadProps(__spreadValues({}, formData.submissionFormat), { softCopy: e.target.checked })
        })),
        className: "rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
      }
    ), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-medium text-slate-700" }, "Soft Copy (PDF/CAD)")))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Enclosures / Attached Items"), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "e.g. 2 x Printed Drawing Rolls, 1 x Calculation Sheet",
        value: formData.enclosures,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { enclosures: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg"
      }
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "border-t border-slate-100 pt-3 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-2" }, "Attach Document, Drawing, Photo or Cloud Link"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-3 mb-2" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => setAttachmentMode("file"),
        className: `px-3 py-1 rounded-md font-medium transition ${attachmentMode === "file" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`
      },
      "Upload File / Photo"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => setAttachmentMode("link"),
        className: `px-3 py-1 rounded-md font-medium transition ${attachmentMode === "link" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`
      },
      "Paste Cloud Link"
    )), attachmentMode === "file" ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-center w-full" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-col items-center justify-center pt-2 pb-3" }, /* @__PURE__ */ import_react3.default.createElement(CloudUpload, { className: "w-6 h-6 text-slate-400 mb-1" }), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-xs text-slate-500" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-semibold text-blue-600" }, "Click to upload"), " or drag and drop"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-[10px] text-slate-400" }, "PDF, DWG, PNG, JPG up to 25MB")), /* @__PURE__ */ import_react3.default.createElement("input", { type: "file", className: "hidden", onChange: handleFileChange }))) : /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "url",
        placeholder: "https://drive.google.com/... or https://onedrive.com/...",
        value: externalUrl,
        onChange: (e) => setExternalUrl(e.target.value),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
      }
    ), uploadedFile && /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-2 text-xs text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 flex items-center justify-between" }, /* @__PURE__ */ import_react3.default.createElement("span", null, "Attached: ", uploadedFile.name, " (", (uploadedFile.size / 1024).toFixed(1), " KB)"), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", onClick: () => setUploadedFile(null), className: "text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react3.default.createElement(X, { className: "w-4 h-4" })))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Initial Status"), /* @__PURE__ */ import_react3.default.createElement(
      "select",
      {
        value: formData.status,
        onChange: (e) => setFormData(__spreadProps(__spreadValues({}, formData), { status: e.target.value })),
        className: "w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
      },
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Under Review" }, "Under Review"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Approved (Code A)" }, "Approved (Code A)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Approved as Noted (Code B)" }, "Approved as Noted (Code B)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Resubmit / Revise (Code C)" }, "Resubmit / Revise (Code C)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Closed / Rejected (Code D)" }, "Closed / Rejected (Code D)")
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-end justify-end gap-2" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => setIsFormOpen(false),
        className: "px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition"
      },
      "Cancel"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        type: "submit",
        className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
      },
      "+ Save to Log"
    ))))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "relative w-full md:w-80" }, /* @__PURE__ */ import_react3.default.createElement(Search, { className: "w-4 h-4 absolute left-3 top-2.5 text-slate-400" }), /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "Search Serial ID, Title, Drawing No...",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        className: "w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-1.5 shrink-0" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 font-medium" }, "Discipline:"), /* @__PURE__ */ import_react3.default.createElement(
      "select",
      {
        value: selectedDisciplineFilter,
        onChange: (e) => setSelectedDisciplineFilter(e.target.value),
        className: "bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none"
      },
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "All" }, "All Disciplines"),
      AVAILABLE_DISCIPLINES.map((d) => /* @__PURE__ */ import_react3.default.createElement("option", { key: d, value: d }, d))
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-1.5 shrink-0" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 font-medium" }, "Status:"), /* @__PURE__ */ import_react3.default.createElement(
      "select",
      {
        value: selectedStatus,
        onChange: (e) => setSelectedStatus(e.target.value),
        className: "bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none"
      },
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "All" }, "All Statuses"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Approved (Code A)" }, "Approved (Code A)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Approved as Noted (Code B)" }, "Approved as Noted (Code B)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Resubmit / Revise (Code C)" }, "Resubmit / Revise (Code C)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Closed / Rejected (Code D)" }, "Closed / Rejected (Code D)"),
      /* @__PURE__ */ import_react3.default.createElement("option", { value: "Under Review" }, "Under Review")
    )))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "hidden lg:block overflow-x-auto" }, /* @__PURE__ */ import_react3.default.createElement("table", { className: "w-full text-left border-collapse" }, /* @__PURE__ */ import_react3.default.createElement("thead", null, /* @__PURE__ */ import_react3.default.createElement("tr", { className: "bg-slate-100/80 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200" }, /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5 pl-4" }, "ISO Serial & Rev"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5" }, "Disciplines"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5" }, "Title & Drawing Details"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5" }, "BOQ / Spec Ref"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5" }, "Format"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5" }, "Date"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5" }, "Status"), /* @__PURE__ */ import_react3.default.createElement("th", { className: "p-3.5 text-right pr-4" }, "Save & Share"))), /* @__PURE__ */ import_react3.default.createElement("tbody", { className: "divide-y divide-slate-100 text-xs" }, filteredEntries.map((item) => {
      var _a, _b;
      const badge = getStatusBadge(item.status);
      return /* @__PURE__ */ import_react3.default.createElement(
        "tr",
        {
          key: item.id,
          onClick: () => setSelectedEntry(item),
          className: "hover:bg-slate-50/80 transition cursor-pointer"
        },
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 pl-4 font-mono font-bold text-blue-600 whitespace-nowrap" }, item.id, /* @__PURE__ */ import_react3.default.createElement("span", { className: "block text-[10px] text-slate-400 font-normal" }, item.rev)),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-wrap gap-1" }, (item.disciplines || []).map((disc) => /* @__PURE__ */ import_react3.default.createElement("span", { key: disc, className: "inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200" }, getDisciplineIcon(disc), disc)))),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 max-w-xs" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-semibold text-slate-800 block truncate" }, item.title), item.drawingNo && /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] text-slate-400 font-mono block" }, "Dwg: ", item.drawingNo, " (", item.drawingTitle || "N/A", ")")),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 font-mono text-[11px] text-slate-600" }, item.boqRef || "\u2014", item.specRef && /* @__PURE__ */ import_react3.default.createElement("span", { className: "block text-[10px] text-slate-400" }, item.specRef)),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 whitespace-nowrap" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex gap-1" }, ((_a = item.submissionFormat) == null ? void 0 : _a.hardCopy) && /* @__PURE__ */ import_react3.default.createElement("span", { className: "bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-mono" }, "HC"), ((_b = item.submissionFormat) == null ? void 0 : _b.softCopy) && /* @__PURE__ */ import_react3.default.createElement("span", { className: "bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-mono" }, "SC"))),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 text-slate-500 whitespace-nowrap" }, item.date),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 whitespace-nowrap" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.style}` }, badge.icon, item.status)),
        /* @__PURE__ */ import_react3.default.createElement("td", { className: "p-3.5 pr-4 text-right whitespace-nowrap", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-end gap-1" }, /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handlePrintItemPDF(item),
            title: "Save / Print Individual PDF",
            className: "p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition border border-blue-200"
          },
          /* @__PURE__ */ import_react3.default.createElement(Printer, { className: "w-3.5 h-3.5" })
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handleExportItemToExcel(item),
            title: "Download Item as Excel (.csv)",
            className: "p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition border border-emerald-200"
          },
          /* @__PURE__ */ import_react3.default.createElement(FileSpreadsheet, { className: "w-3.5 h-3.5" })
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handleShareItemEmail(item),
            title: "Share via Email",
            className: "p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
          },
          /* @__PURE__ */ import_react3.default.createElement(Mail, { className: "w-3.5 h-3.5 text-rose-500" })
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handleCopyItemTeams(item),
            title: "Share via MS Teams",
            className: "p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
          },
          /* @__PURE__ */ import_react3.default.createElement(MessageSquare, { className: "w-3.5 h-3.5 text-blue-500" })
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => setSelectedEntry(item),
            className: "p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
          },
          /* @__PURE__ */ import_react3.default.createElement(ChevronRight, { className: "w-3.5 h-3.5" })
        )))
      );
    })))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "block lg:hidden divide-y divide-slate-100" }, filteredEntries.map((item) => {
      const badge = getStatusBadge(item.status);
      return /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          key: item.id,
          onClick: () => setSelectedEntry(item),
          className: "p-4 space-y-3 hover:bg-slate-50 transition cursor-pointer"
        },
        /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-mono text-xs font-bold text-blue-600" }, item.id), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] text-slate-400 font-mono ml-2" }, "(", item.rev, ")"), /* @__PURE__ */ import_react3.default.createElement("h3", { className: "text-sm font-semibold text-slate-800 mt-0.5" }, item.title)), /* @__PURE__ */ import_react3.default.createElement("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${badge.style}` }, badge.icon, item.status)),
        /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-wrap gap-1.5" }, (item.disciplines || []).map((disc) => /* @__PURE__ */ import_react3.default.createElement("span", { key: disc, className: "inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200" }, getDisciplineIcon(disc), disc))),
        item.drawingNo && /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-xs text-slate-500 font-mono" }, "Dwg: ", item.drawingNo, " ", item.drawingTitle ? `\u2014 ${item.drawingTitle}` : ""),
        /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between border-t border-slate-100 pt-2 text-xs", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400" }, item.date), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-1.5 flex-wrap" }, /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handlePrintItemPDF(item),
            className: "inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-[11px] font-medium border border-blue-200"
          },
          /* @__PURE__ */ import_react3.default.createElement(Printer, { className: "w-3 h-3" }),
          " PDF"
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handleExportItemToExcel(item),
            className: "inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[11px] font-medium border border-emerald-200"
          },
          /* @__PURE__ */ import_react3.default.createElement(FileSpreadsheet, { className: "w-3 h-3" }),
          " Excel"
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handleShareItemEmail(item),
            className: "inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[11px] font-medium text-slate-700"
          },
          /* @__PURE__ */ import_react3.default.createElement(Mail, { className: "w-3 h-3 text-rose-500" }),
          " Email"
        ), /* @__PURE__ */ import_react3.default.createElement(
          "button",
          {
            onClick: () => handleCopyItemTeams(item),
            className: "inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[11px] font-medium text-slate-700"
          },
          /* @__PURE__ */ import_react3.default.createElement(MessageSquare, { className: "w-3 h-3 text-blue-500" }),
          " Teams"
        )))
      );
    })))), selectedEntry && /* @__PURE__ */ import_react3.default.createElement("div", { className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-5 p-6" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-start justify-between border-b border-slate-100 pb-4" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-mono text-xs font-bold text-blue-600 block" }, selectedEntry.id), /* @__PURE__ */ import_react3.default.createElement("h2", { className: "text-lg font-bold text-slate-800" }, selectedEntry.title), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "Revision: ", selectedEntry.rev, " | Date: ", selectedEntry.date)), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setSelectedEntry(null),
        className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg"
      },
      /* @__PURE__ */ import_react3.default.createElement(X, { className: "w-5 h-5" })
    )), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 block font-bold text-[10px] uppercase" }, "Module"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-semibold text-slate-700" }, selectedEntry.module)), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 block font-bold text-[10px] uppercase" }, "Originator / Zone"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-semibold text-slate-700" }, selectedEntry.originator, " / ", selectedEntry.zone)), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 block font-bold text-[10px] uppercase" }, "Status"), /* @__PURE__ */ import_react3.default.createElement("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${getStatusBadge(selectedEntry.status).style}` }, selectedEntry.status)), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 block font-bold text-[10px] uppercase" }, "Drawing No"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-mono text-slate-700" }, selectedEntry.drawingNo || "N/A")), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 block font-bold text-[10px] uppercase" }, "BOQ Ref"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-mono text-slate-700" }, selectedEntry.boqRef || "N/A")), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 block font-bold text-[10px] uppercase" }, "Spec Ref"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-mono text-slate-700" }, selectedEntry.specRef || "N/A"))), selectedEntry.itemDescription && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-xs" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-700 block mb-1" }, "Description & Scope:"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100" }, selectedEntry.itemDescription)), selectedEntry.enclosures && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-xs" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-700 block mb-1" }, "Enclosures:"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100" }, selectedEntry.enclosures)), selectedEntry.attachment && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-xs border-t border-slate-100 pt-3" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-700 block mb-2" }, "Attached Document / Link:"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between p-3 bg-blue-50/60 rounded-xl border border-blue-200" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2.5 overflow-hidden" }, getAttachmentIcon(selectedEntry.attachment.type), /* @__PURE__ */ import_react3.default.createElement("div", { className: "truncate" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "font-medium text-slate-800 truncate" }, selectedEntry.attachment.name), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-[10px] text-slate-500" }, selectedEntry.attachment.size))), selectedEntry.attachment.url && /* @__PURE__ */ import_react3.default.createElement(
      "a",
      {
        href: selectedEntry.attachment.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold text-xs flex items-center gap-1 hover:bg-blue-700 transition shrink-0"
      },
      /* @__PURE__ */ import_react3.default.createElement(ExternalLink, { className: "w-3.5 h-3.5" }),
      " Open"
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-end gap-2 border-t border-slate-100 pt-4 text-xs" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => handlePrintItemPDF(selectedEntry),
        className: "px-3.5 py-2 bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-1.5 hover:bg-blue-700 transition"
      },
      /* @__PURE__ */ import_react3.default.createElement(Printer, { className: "w-4 h-4" }),
      " Print / Save PDF"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setSelectedEntry(null),
        className: "px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition"
      },
      "Close"
    )))), reportModalOpen && /* @__PURE__ */ import_react3.default.createElement("div", { className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl space-y-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-100 pb-3" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "font-bold text-slate-800 text-base" }, "Export ISO Register Summary"), /* @__PURE__ */ import_react3.default.createElement("button", { onClick: () => setReportModalOpen(false), className: "text-slate-400 hover:text-slate-600" }, /* @__PURE__ */ import_react3.default.createElement(X, { className: "w-5 h-5" }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-3 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Timeframe Period"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-4 gap-2" }, ["Daily", "Weekly", "Monthly", "Annually"].map((tf) => /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        key: tf,
        onClick: () => setReportTimeframe(tf),
        className: `py-2 rounded-lg font-semibold border transition ${reportTimeframe === tf ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-600 border-slate-200"}`
      },
      tf
    )))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("label", { className: "block font-semibold text-slate-700 mb-1" }, "Generated Summary Preview"), /* @__PURE__ */ import_react3.default.createElement(
      "textarea",
      {
        readOnly: true,
        rows: 8,
        value: reportShareText,
        className: "w-full font-mono text-[11px] p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
      }
    ))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4 text-xs" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handlePrintPDF,
        className: "px-3.5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition flex items-center gap-1.5"
      },
      /* @__PURE__ */ import_react3.default.createElement(Printer, { className: "w-4 h-4" }),
      " Print / Save PDF"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handleCopyShareLink,
        className: "px-3.5 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition flex items-center gap-1.5"
      },
      /* @__PURE__ */ import_react3.default.createElement(Copy, { className: "w-4 h-4" }),
      " ",
      copiedLink ? "Copied!" : "Copy Summary"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: () => setReportModalOpen(false),
        className: "px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-medium"
      },
      "Close"
    )))));
  }
  return __toCommonJS(stdin_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/briefcase.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/building-2.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/check.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-right.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle-alert.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle-check.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle-x.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/clock.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/cloud-upload.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/compass.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/copy.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/external-link.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/file-spreadsheet.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/file-text.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/folder-open.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/hard-hat.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/image.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/layers.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/mail.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/map-pin.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/message-square.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/pen-line.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/plus.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/printer.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/save.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/search.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/shield-alert.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/x.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/wrench.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/zap.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/

            document.addEventListener('DOMContentLoaded', function() {
                const root = ReactDOM.createRoot(document.getElementById('root'));

                // Include the compiled error boundary code
                var ErrorBoundaryModule = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type)
            return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type)
            return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE)
            return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning)
              return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            void 0,
            void 0,
            oldElement._owner,
            oldElement.props,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function noop$1() {
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type)
            children = null;
          var invokeCallback = false;
          if (null === children)
            invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children)
            return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 1, payload._result = moduleObject;
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 2, payload._result = error;
              }
            );
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
          }
          if (1 === payload._status)
            return ctor = payload._result, void 0 === ctor && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ctor
            ), "default" in ctor || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ctor
            ), ctor.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function noop() {
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else
              ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else
                    break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        }, fnName;
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          V: null,
          actQueue: null,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs["react-stack-bottom-frame"].bind(deprecatedAPIs, UnknownOwner)();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event))
              return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        exports.Children = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else
                      resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName)
            props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            void 0,
            void 0,
            owner,
            props,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++) {
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
          }
          i = {};
          node = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength)
            i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          node && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            node,
            void 0,
            void 0,
            getOwner(),
            i,
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: { _status: -1, _result: ctor },
            _init: lazyInitializer
          };
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, createDeps, update) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          var dispatcher = resolveDispatcher();
          if ("function" === typeof update)
            throw Error(
              "useEffect CRUD overload is not enabled in this build of React."
            );
          return dispatcher.useEffect(create, createDeps);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.1.0";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var React = require_react();
      function createErrorBoundary() {
        return class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              hasError: false,
              error: null,
              errorInfo: null,
              isCopied: false,
              isMinimized: false,
              isFullWidth: true,
              copyButtonState: "default"
            };
            this.copyErrorToClipboard = this.copyErrorToClipboard.bind(this);
            this.toggleMinimize = this.toggleMinimize.bind(this);
            this.toggleFullWidth = this.toggleFullWidth.bind(this);
          }
          static getDerivedStateFromError(error) {
            return {
              hasError: true,
              error,
              errorInfo: null,
              isCopied: false,
              isMinimized: false,
              // Start expanded when error occurs
              isFullWidth: false,
              copyButtonState: "default"
            };
          }
          componentDidCatch(error, errorInfo) {
            this.setState({
              error,
              errorInfo
            });
            console.error("Error caught by ErrorBoundary:", error, errorInfo);
          }
          copyErrorToClipboard() {
            if (this.state.error) {
              const errorText = `Error: ${this.state.error.toString()}

Component Stack:
${this.state.errorInfo ? this.state.errorInfo.componentStack : "Not available"}`;
              const fallbackCopyTextToClipboard = (text) => {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                  const successful = document.execCommand("copy");
                  const msg = successful ? "Text copied to clipboard" : "Failed to copy text";
                  console.log(msg);
                  this.setState({
                    isCopied: successful,
                    copyButtonState: successful ? "copied" : "default"
                  });
                  if (successful) {
                    setTimeout(() => {
                      this.setState({
                        isCopied: false,
                        copyButtonState: "default"
                      });
                    }, 2e3);
                  }
                } catch (err) {
                  console.error("Fallback: Failed to copy text: ", err);
                } finally {
                  document.body.removeChild(textArea);
                }
              };
              if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(errorText);
                return;
              }
              navigator.clipboard.writeText(errorText).then(() => {
                this.setState({
                  isCopied: true,
                  copyButtonState: "copied"
                });
                setTimeout(() => {
                  this.setState({
                    isCopied: false,
                    copyButtonState: "default"
                  });
                }, 2e3);
              }).catch((err) => {
                console.error("Failed to copy error details:", err);
                fallbackCopyTextToClipboard(errorText);
              });
            }
          }
          toggleMinimize() {
            this.setState((prevState) => ({
              isMinimized: !prevState.isMinimized,
              // If minimizing, ensure it's not full width
              isFullWidth: prevState.isMinimized ? prevState.isFullWidth : false
            }));
          }
          toggleFullWidth() {
            if (!this.state.isMinimized) {
              this.setState((prevState) => ({
                isFullWidth: !prevState.isFullWidth
              }));
            }
          }
          render() {
            if (this.state.hasError) {
              const { isMinimized, isFullWidth, isCopied, error, errorInfo } = this.state;
              const AlertTriangleIcon = (_a) => {
                var _b = _a, { className } = _b, otherProps = __objRest(_b, ["className"]);
                return /* @__PURE__ */ React.createElement(
                  "svg",
                  __spreadValues({
                    xmlns: "http://www.w3.org/2000/svg",
                    width: isMinimized ? "16" : "20",
                    height: isMinimized ? "16" : "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: className || "text-red-500 dark:text-red-400"
                  }, otherProps),
                  /* @__PURE__ */ React.createElement("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
                  /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
                  /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
                );
              };
              const CopyIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                /* @__PURE__ */ React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
              );
              const MinimizeIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              );
              const ExpandIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("polyline", { points: "15 3 21 3 21 9" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "9 21 3 21 3 15" }),
                /* @__PURE__ */ React.createElement("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
                /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
              );
              const CompressIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("polyline", { points: "4 14 10 14 10 20" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "20 10 14 10 14 4" }),
                /* @__PURE__ */ React.createElement("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
                /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
              );
              const RefreshIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("path", { d: "M23 4v6h-6" }),
                /* @__PURE__ */ React.createElement("path", { d: "M1 20v-6h6" }),
                /* @__PURE__ */ React.createElement("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
              );
              const CheckIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" })
              );
              if (isMinimized) {
                return /* @__PURE__ */ React.createElement(React.Fragment, null, this.props.children, /* @__PURE__ */ React.createElement(
                  "div",
                  {
                    className: "fixed bottom-4 right-4 z-[9999]",
                    onClick: this.toggleMinimize
                  },
                  /* @__PURE__ */ React.createElement("div", { className: "group flex items-center justify-center w-10 h-10 rounded-full bg-red-500 shadow-lg cursor-pointer hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-600" }, /* @__PURE__ */ React.createElement(AlertTriangleIcon, { className: "text-white dark:text-gray-100" }), /* @__PURE__ */ React.createElement("div", { className: "absolute right-12 bottom-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap dark:bg-gray-900 shadow-md" }, "Error - Click to expand"))
                ));
              }
              const baseContainerClasses = "fixed bottom-0 z-[9999] transition-all duration-300 ease-in-out mb-8";
              const innerBoxBaseClasses = "relative overflow-hidden rounded-lg border border-red-300 bg-white shadow-xl dark:border-red-700 dark:bg-gray-950";
              const positionAndWidthClass = isFullWidth ? "inset-x-0 w-full" : "right-4 w-[32rem] max-w-[90vw]";
              const paddingClass = isFullWidth ? "p-4" : "";
              return /* @__PURE__ */ React.createElement(React.Fragment, null, this.props.children, /* @__PURE__ */ React.createElement("div", { className: `${baseContainerClasses} ${positionAndWidthClass} ${paddingClass}` }, /* @__PURE__ */ React.createElement(
                "div",
                {
                  className: `${innerBoxBaseClasses} ${isFullWidth ? "mx-auto" : ""}`,
                  style: isFullWidth ? { maxWidth: "100%" } : {}
                },
                /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between bg-gradient-to-r from-red-100 to-red-200 px-3 py-2 dark:from-red-950/50 dark:to-red-900/50" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(AlertTriangleIcon, { className: "text-red-500 dark:text-red-400" }), /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-semibold text-red-800 dark:text-red-300" }, "Sorry, something went wrong")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: () => window.location.reload(),
                    className: "rounded p-1 text-gray-600 hover:bg-red-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-red-800/50 dark:hover:text-gray-200 transition-colors",
                    title: "Refresh page"
                  },
                  /* @__PURE__ */ React.createElement(RefreshIcon, null)
                ), /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: this.toggleFullWidth,
                    className: "rounded p-1 text-gray-600 hover:bg-red-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-red-800/50 dark:hover:text-gray-200 transition-colors",
                    title: isFullWidth ? "Reduce width" : "Expand to full width"
                  },
                  isFullWidth ? /* @__PURE__ */ React.createElement(CompressIcon, null) : /* @__PURE__ */ React.createElement(ExpandIcon, null)
                ), /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: this.toggleMinimize,
                    className: "rounded p-1 text-gray-600 hover:bg-red-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-red-800/50 dark:hover:text-gray-200 transition-colors",
                    title: "Minimize"
                  },
                  /* @__PURE__ */ React.createElement(MinimizeIcon, null)
                ))),
                /* @__PURE__ */ React.createElement("div", { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-700 dark:text-gray-300" }, "You can copy the error details and ask Gemini to fix the error.")), /* @__PURE__ */ React.createElement(
                  "div",
                  {
                    className: `overflow-auto rounded bg-gray-50 p-3 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 scrollbar-none ${isFullWidth ? "max-h-[40vh]" : "max-h-60"}`
                  },
                  /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("h4", { className: "text-xs uppercase font-semibold text-gray-500 dark:text-gray-400" }, "Error Message:"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs text-red-700 dark:text-red-400 break-words px-2 py-1.5 bg-red-50 dark:bg-red-900/30 rounded border border-red-100 dark:border-red-900/50" }, error ? error.toString() : "No error message available.")), errorInfo && /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("h4", { className: "text-xs uppercase font-semibold text-gray-500 dark:text-gray-400" }, "Component Stack:"), /* @__PURE__ */ React.createElement("pre", { className: "whitespace-pre-wrap font-mono text-xs text-gray-700 dark:text-gray-300 px-2 py-1.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700" }, errorInfo.componentStack)))
                ), /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: this.copyErrorToClipboard,
                    className: `flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md transition-colors w-full ${this.state.copyButtonState === "copied" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700"}`
                  },
                  this.state.copyButtonState === "copied" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CheckIcon, null), "Copied to Clipboard!") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CopyIcon, null), "Copy Error Details")
                )))
              )));
            }
            return this.props.children;
          }
        };
      }
      module.exports = { createErrorBoundary };
    }
  });
  return require_stdin();
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/


                // Use the exported createErrorBoundary function
                const ErrorBoundary = ErrorBoundaryModule.createErrorBoundary();

                const AppComponent = React.createElement(
                    ErrorBoundary,
                    null,
                    React.createElement(App.default, null)
                );
                root.render(AppComponent);
            });
        </script>
    </body>
</html>
