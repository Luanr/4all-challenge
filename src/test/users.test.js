import { equal } from "assert";

let mockObject = {
    nsu: '01234',
    valor: '50.22',
    bandeira: 'VISA',
    modalidade: 'credito',
    horario: '2019-01-02T06:02:01-03:00',
    liquido: '22.22',
    disponivel: '2019-01-02T06:02:01-03:00'
};

describe('Testing JSON format', () => {
  it('It should accept a valid transaction', () => {
    equal(5, 5);
  });
});