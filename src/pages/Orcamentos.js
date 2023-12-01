import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import styles from './Orcamento.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button/Button";

const Orcamentos = () => {
    const [formValues, setFormValues] = useState({});
    const [productsValues, setProductsValues] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setProductsValues();
        setButtonDisabled(true);
        setIsModalOpen(false);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleProductOnChange = (e) => {
        const { name, value } = e.target;
        setProductsValues({
            ...productsValues,
            [name]: value
        });
    }

    const handleAddProduct = () => {
        setFormValues({
            ...formValues,
            produtos: [
                ...formValues.produtos || [],
                {...productsValues}
            ]
        });
        handleCloseModal();
    }

    const handleTrash = (index) => {
        const products = formValues.produtos.filter((_produto, i) => i !== index);

        setFormValues({
            ...formValues,
            produtos: products
        });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (!formValues.produtos || formValues.produtos.length === 0) {
                alert('Por favor, adicione pelo menos um produto.');
                return;
            }

            await axios.post('/api/v1/orcamentos', formValues);

            alert('Orçamento cadastrado com sucesso.');
            
            window.location.reload();
        } catch (error) {
            alert('Houve um erro ao realizar operação, tente novamente mais tarde.');
        }
    }

    useEffect(() => {
        if (productsValues?.nome && productsValues?.valor) {
            setButtonDisabled(false);
        }
    }, [productsValues]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Tela de Orçamentos</h1>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome do Cliente"
                        name="nome_cliente"
                        type="text"
                        maxlength="45"
                        onChange={handleOnChange}
                        required
                    />
                    <Input
                        label="Data do Orçamento"
                        name="data"
                        type="date"
                        onChange={handleOnChange}
                        required
                    />

                    <div className={styles.spaceProduct}>
                        <h2>Produtos</h2>
                        <Button
                            type="button"
                            text="Adicionar"
                            icon={<FontAwesomeIcon icon={faAdd}/>}
                            onClick={handleOpenModal}
                        />
                    </div>

                    <span>Quantidade de Produtos: {formValues.produtos?.length || 0}</span>

                    <div>
                        {formValues.produtos?.length > 0 ? (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Remover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formValues.produtos.map((produto, index) => (
                                        <tr key={index}>
                                            <td>{produto.nome}</td>
                                            <td>{produto.valor}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    icon={<FontAwesomeIcon icon={faTrash} />}
                                                    className={styles.trashButton}
                                                    onClick={() => handleTrash(index)}
                                                />   
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </div>

                    <div className={styles.buttonSave}>
                        <Button type="submit" text="Salvar"/>
                    </div>               

                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                        <h2>Cadastro de Produto</h2>
                        <Input
                            label="Nome do Produto"
                            name="nome"
                            type="text"
                            maxlength="45"
                            onChange={handleProductOnChange}
                            required
                        />
                        <Input
                            label="Valor do Produto"
                            name="valor"
                            type="number"
                            min={0}
                            onChange={handleProductOnChange}
                            required
                        />

                        <div className={styles.addButton}>
                            <Button
                                type="button"
                                onClick={handleAddProduct}
                                disabled={buttonDisabled}
                                text="Salvar"
                            />
                        </div>
                    </Modal>
                </form>
            </div>
        </div>
    );
}

export default Orcamentos;