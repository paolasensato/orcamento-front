import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import styles from './Orcamento.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

            const {data} = await axios.post('/api/v1/orcamentos', formValues);

            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (productsValues?.nome && productsValues?.valor) {
            setButtonDisabled(false);
        }
    }, [productsValues]);

    return (
        <div className={styles.container}>
            <h1>Tela de Orçamentos</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Nome do Cliente"
                    name="nome_cliente"
                    type="text"
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

                <h3>Produtos</h3>

                <button type="button" className="modal-open" onClick={handleOpenModal}>Adicionar Produto</button>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <Input
                        label="Nome do Produto"
                        name="nome"
                        type="text"
                        onChange={handleProductOnChange}
                        required
                    />
                    <Input
                        label="Valor do Produto"
                        name="valor"
                        type="number"
                        onChange={handleProductOnChange}
                        required
                    />
                    <button 
                        type="button"
                        onClick={handleAddProduct}
                        disabled={buttonDisabled}
                    >Adicionar</button>
                </Modal>

                <button type="submit">Salvar</button>
            </form>
            
            {
                formValues.produtos?.map((produto, index) => (
                    <div key={index}>
                        <p>{produto.nome}</p>
                        <p>{produto.valor}</p>
                        <button type="button" onClick={() => handleTrash(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default Orcamentos;