import className from "classnames";
import { oneOfType } from "prop-types";
import { twMerge } from "tailwind-merge";

function Button({
                    children,
                    primary,
                    secondary,
                    success,
                    warning,
                    danger,
                    outline,
                    rounded,
                    ...rest
                }) {
    /* Вместо кода ниже, буду использовать библиотеку: prop-types   */
    // if (primary && secondary) {
    //   throw new Error('only one of primary and secondary should be provided.');
    // }

    /* twMerge() нужно чтобы решить баг, из-за которого не совмещались outline && primary, и в результате были белые кнопки и белый текст.
        twMerge нужно установить через терминал: npm install tailwind-merge     */
    /* А строчка rest.className внутри функции className() нужна для того,
       чтобы можно было из внешнего используемого в коде компонента Button передавать внутрь ещё и props className={}
       внутри которого прописать дополнительные CSS правила для конкретной Button на которую это добавить.  */
    /* еще очень важен порядок предаваемых пропсов внутри <button {...rest} className={classes}>
       Order matters, because if {...rest} is placed after className, it will override classes.     */
    const classes = twMerge(
        className(rest.className, "flex items-center px-3 py-1.5 border", {
            "border-blue-600 bg-blue-500 text-white": primary,
            "border-gray-900 bg-gray-900 text-white": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-yellow-400 bg-yellow-400 text-white": warning,
            "border-red-500 bg-red-500 text-white": danger,
            "rounded-full": rounded,
            "bg-white": outline,
            "text-blue-500": outline && primary,
            "text-gray-900": outline && secondary,
            "text-green-500": outline && success,
            "text-yellow-400": outline && warning,
            "text-red-500": outline && danger,
        })
    );

    return (
        <button {...rest} className={classes}>
            {children}
        </button>
    );
}

Button.propTypes = {
    checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
        //console.log(props);
        const count =
            Number(!!primary) +
            Number(!!secondary) +
            Number(!!success) +
            Number(!!warning) +
            Number(!!danger);

        if (count > 1) {
            return new Error(
                "Only one of primary, secondary, success, warning, danger can be true."
            );
        }
    },
};

export default Button;
