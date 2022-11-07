/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.jsx", "./components/*.jsx"],
    theme: {
        extend: {
            width: {
                nav: "calc(100vw - 300px)",
            },
            colors: {
                blue: "rgba(29 161 242)",
                // green: "rgb(12,154,97)",
                green: "rgba(23,191,99)",
                dark: "rgba(0,0,0,.9)",
            },
            screens: {
                ty: "900px",
                tl: { max: "639px" },
                tlm: { min: "639px" },
                tx: { max: "450px" },
            },
            boxShadow: {
                "3xl": "10px 0px 60px -10px rgba(0, 0, 0, 0.3)",
                "4xl": "10px 0px 10px 0px rgba(0, 0, 0, .5)",
                "5xl": "8px -5px 4px 0px rgba(0, 0, 0, .3)",
                x: "10px  10px 4px 0px rgba(0, 0, 0, .8)",
                x1: "-5px 5px 4px 0px rgba(0, 0, 0, .3)",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "light",
    },
};