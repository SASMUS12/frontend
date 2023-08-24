import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import {Input} from "../../components/UI/Input/Input";
import {Button} from "../../components/UI/Button/Button";
import Gender from "../../components/Gender/Gender";
import Modal from "../../components/Modal/Modal";
import Avatars from "../../components/Avatars/Avatars";

import {useModel} from "./model";

import styles from './FillOutProfilePages.module.scss';
import cn from "classnames";


const FillOutProfilePage1 = () => {
    const model = useModel();
    const navigate = useNavigate();

    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const [isExportAvatarModal, setExportAvatarModal] = useState<boolean>(false);
    const [isCreateAvatarModal, setCreateAvatarModal] = useState<boolean>(false);

    const handleAvatarSelection = (creationWay: string) => {
        if (creationWay === "Загрузить") {
            setExportAvatarModal(true);
        } else {
            setCreateAvatarModal(true);
        }
    };

    const handleModalClose = () => {
        setExportAvatarModal(false);
        setCreateAvatarModal(false);
    };


    const handleFillOutPage1 = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/fill-out-2");
        console.log("FillOutPage1");
    };

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <div className={styles.container}>
                    <ProgressLine pageNumber={1}/>
                    <h1 className={styles.container__title}>Давайте заполним ваш профиль и начнем общаться</h1>
                    <form id="form" className={styles.form} onSubmit={handleFillOutPage1}>
                        <div className={styles.container__fillOutProfileArea}>
                            <Input
                                className={cn(styles.container__fillOutProfileArea_input, styles.container__fillOutProfileArea_input_name)}
                                type="text"
                                name="firstName"
                                value={model.firstName}
                                fontSize="16"
                                label="Укажите имя"
                                labelStyles="label18"
                                isLabelHintHidden={true}
                                placeholder="Имя"
                                required
                                maxLength={12}
                                onValue={model.handleValue}
                            />
                            <h3 className={styles.container__fillOutProfileArea_title}>Пол</h3>
                            <Gender selectedGender={selectedGender} setSelectedGender={setSelectedGender}
                                    componentName="fillOutProfile" />
                        </div>
                        <div className={styles.container__fillOutProfileArea}>
                            <Input
                                className={styles.container__fillOutProfileArea_input}
                                type="date"
                                name="birthdate"
                                value={model.birthdate}
                                fontSize="16"
                                label="Дату рождения"
                                labelStyles="label18"
                                isLabelHintHidden={true}
                                required
                                onValue={model.handleValue}
                            />
                        </div>
                        <div className={styles.container__fillOutProfileArea}>
                            <h3 className={styles.container__fillOutProfileArea_title}>Загрузите фото или создайте
                                аватар</h3>
                            <p className={styles.container__fillOutProfileArea_hint}>Пожалуйста, используйте форматы JPG
                                и PNG</p>
                            <div className={styles.container__fillOutProfileArea_exportAvatar}>
                                <div className={styles.container__fillOutProfileArea_exportAvatar_popup}>
                                    <button onClick={() => handleAvatarSelection('Загрузить')}>Загрузить фотографию
                                    </button>
                                    <button onClick={() => handleAvatarSelection('Создать')}>Создать аватар</button>
                                </div>
                            </div>
                        </div>
                        <Button
                            className={styles.form__button}
                            type="submit"
                            variant="primary"
                            disabled={false}
                        >
                            Продолжить
                        </Button>
                    </form>

                    <Modal className={styles.modal} isOpen={isExportAvatarModal} onClose={handleModalClose}>
                        <h1 className={cn(styles.container__title, styles.modal__title)}>Загрузка фотографии</h1>
                        <p className={styles.modal__text}>
                            Партнёрам будет приятнее вести диалог, если&nbsp;Вы&nbsp;загрузите свою настоящую
                            фотографию. Пожалуйста, используйте форматы JPG и PNG.
                        </p>
                        <Button
                            className={cn(styles.modal__button, styles.modal__button_primary)}
                            type="button"
                            variant="primary"
                            disabled={model.isLoading}
                        >{model.isLoading
                            ? 'Loading'
                            : <label htmlFor="file">Выбрать файл</label>}
                        </Button>
                        <input className={styles.modal__input_file} id="file" type="file"/>
                        <p className={styles.modal__hint}>
                            Если у вас возникли сложности с загрузкой, попробуйте выбрать фотографию меньшего размера.
                        </p>
                    </Modal>

                    <Modal className={styles.modal} isOpen={isCreateAvatarModal} onClose={handleModalClose}>
                        <h1 className={cn(styles.container__title, styles.modal__title)}>Выберите свой аватар</h1>
                        <Avatars selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar}/>
                        <Button
                            className={cn(styles.modal__button, styles.modal__button_primary)}
                            type="button"
                            variant="primary"
                            disabled={model.isLoading}
                        >{model.isLoading
                            ? 'Loading'
                            : 'Сохранить'}
                        </Button>
                        <button className={cn(styles.modal__button, styles.modal__button_transparent)}>
                            Отменить изменения
                        </button>
                    </Modal>

                </div>
            </main>
        </>
    );
}

export default FillOutProfilePage1;
