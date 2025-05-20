import {
  StyledAddButton,
  StyledButtonArea,
  StyledDeleteButton,
  StyledTableItens,
} from "../../StyledComponents/TableList.style";
import styles from "./MonitoramentoTable.module.css";
import { TbTrashXFilled } from "react-icons/tb";

function MonitoramentoTable({
  monitoramentos,
  searchTerm,
  handleLocalRef,
  removeMonitoramento,
}) {
  return (
    <StyledTableItens>
      <table>
        <thead className={styles.stickyHeader}>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Projeto</th>
            <th>Meio</th>
            <th>Categoria</th>
            <th>Subcategoria</th>
            <th>Data Inicial</th>
            <th>Data Final</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {monitoramentos
            .filter((monitoramento) =>
              Object.values(monitoramento).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
            .map((monitoramento,index) => (
              <tr className={styles.infoEquipe} key={monitoramento.id}>
                <td title={index}>{index+1}</td>
                <td title={monitoramento.nome}>{monitoramento.nome}</td>
                <td title={monitoramento.projeto_nome}>
                  {monitoramento.projeto_nome}
                </td>
                <td title={monitoramento.meio}>{monitoramento.meio}</td>
                <td title={monitoramento.categoria}>
                  {monitoramento.categoria}
                </td>
                <td title={monitoramento.subcategoria}>
                  {monitoramento.subcategoria}
                </td>
                <td title={monitoramento.inicio}>{monitoramento.inicio}</td>
                <td title={monitoramento.fim}>{monitoramento.fim}</td>
                <td>
                  <StyledButtonArea>
                    <StyledAddButton
                      title="Criar Local de Referência"
                      onClick={() => handleLocalRef(monitoramento)}
                    >
                      +
                    </StyledAddButton>
                    <StyledDeleteButton
                      title="Excluir Projeto"
                      onClick={() => removeMonitoramento(monitoramento.id)}
                    >
                      <TbTrashXFilled />
                    </StyledDeleteButton>
                  </StyledButtonArea>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </StyledTableItens>
  );
}

export default MonitoramentoTable;
