import styles from './MonitoramentoTable.module.css'
import { BiTrash, BiCurrentLocation } from 'react-icons/bi'


function MonitoramentoRow({ monitoramento, handleLocalRef, removeMonitoramento }) {
  return (
    monitoramento && (
      <tr className={styles.infoEquipe} key={monitoramento.id}>
        <td title={monitoramento.nome}>{monitoramento.nome}</td>
        <td title={monitoramento.projeto_nome}>{monitoramento.projeto_nome}</td>
        <td title={monitoramento.meio}>{monitoramento.meio}</td>
        <td title={monitoramento.categoria}>{monitoramento.categoria}</td>
        <td title={monitoramento.subcategoria}>{monitoramento.subcategoria}</td>
        <td title={monitoramento.inicio}>{monitoramento.inicio}</td>
        <td title={monitoramento.fim}>{monitoramento.fim}</td>
        <td>
          <div className={styles.iconArea}>
            <button
              className={styles.icon}
              title="Criar Local de Referência"
              onClick={() => handleLocalRef(monitoramento)}
            >
              <BiCurrentLocation />
            </button>
            <button
              className={styles.icon2}
              title="Excluir Projeto"
              onClick={() => removeMonitoramento(monitoramento.id)}
            >
              <BiTrash />
            </button>
          </div>
        </td>
      </tr>
    )
  );
}
export default MonitoramentoRow;
