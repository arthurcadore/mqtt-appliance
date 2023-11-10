package eng.telecom.MqttBroker;

import java.lang.annotation.Inherited;

import jarkarta.persistence.Entity;

@Entity
@Table(name=luminosidade)
public class PostLuminosidade {

  @Id
  private Integer id;

  private String mensagem;

  private String data_insercao;
}

