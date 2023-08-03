import esbuild from "esbuild";

const postCssPlugin = require("esbuild-style-plugin");


type BuildOptions = {
    env: "production" | "development";
};

export async function createContext(options: BuildOptions) {
    const {env} = options;

    return await esbuild.context({
        entryPoints: ["./src/index.tsx"], // We read the React application from this entrypoint
        outfile: "./public/index.js", // We output a single file in the public/ folder (remember that the "script.js" is used inside our HTML page)
        define: {
            "process.env.NODE_ENV": `"${env}"`, // We need to define the Node.js environment in which the client is built
        },
        plugins: [postCssPlugin({
            postcss: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
            }
        })],
        bundle: true,
        minify: env === "production",
        sourcemap: env === "development",
    });
}

async function dev() {
    const context = await createContext({env: "development"});

    await context.watch();

    console.log("Esbuild rebuilds the client on every file change");
}

async function build() {
    const context = await createContext({env: "production"});

    await context.dispose();
}

const args = process.argv.slice(2);
if (args[0] === "dev") {
    dev();
} else {
    build();
}
