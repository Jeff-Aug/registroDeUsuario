import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import { Container, Error } from "./styles";

/**
 * Responsavel por receber componentes como uma propriedade
 */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>; 
}
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [IsFocused, setIsFocused] = useState(false);
    const [IsFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current, // Pega o tag html
            path: "value", // pega o valor daquele tag, é exatamente uma jquery.
        });
    }, [fieldName, registerField]);

    // Função q deixa o ícone na cor laranja, quando o input for preenchido.
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        // ? serve para verificar se há algo, se é válido acessar essa propriedade.
        setIsFilled(!!inputRef.current?.value); // !! Transforma para boleano, se tiver conteudo, é true, se não false.
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    return (
        <Container isError={!!error} IsFilled={IsFilled} IsFocused={IsFocused}>
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
            {error && (
                // <Error title={error}>
                //     <FiAlertCircle color="c53030" size={20} />
                <h2>doce jaca</h2>
                // </Error>
            )}
        </Container>
    );
};

export default Input;