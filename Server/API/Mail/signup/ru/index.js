import Mail from '../../Mail'
import path from 'path'

export default new Mail({
    subject: 'Регистрация завершена',
    template: path.join(__dirname, 'index.ejs')
});