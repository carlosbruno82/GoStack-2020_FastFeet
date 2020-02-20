import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number()
        .integer()
        .positive()
        .required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      CEP: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const nameExists = await Recipient.findOne({
      where: { nome: req.body.nome },
    });

    if (nameExists) {
      return res.status(400).json({ error: 'Este nome já existe' });
    }

    const {
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      CEP,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      CEP,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number()
        .integer()
        .positive(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      CEP: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { id } = req.params;

    const destinatario = await Recipient.findByPk(id);

    if (!destinatario) {
      return res.status(400).json({ error: 'O destinatário não existe' });
    }

    const {
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      CEP,
    } = await destinatario.update(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      CEP,
    });
  }
}

export default new RecipientController();
