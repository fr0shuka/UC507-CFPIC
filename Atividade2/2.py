class Veiculo:
    # Construtor: Inicializa os atributos
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        self.velocidade_atual = 0  # Atributo inicializado

    # Método para aumentar a velocidade
    def acelerar(self):
        self.velocidade_atual += 10

    # Método para diminuir a velocidade
    def travar(self):
        # Regra de Negócio: Não pode ser negativo
        if (self.velocidade_atual - 5) < 0:
            self.velocidade_atual = 0
        else:
            self.velocidade_atual -= 5


# --- Teste ---
# 1. Instanciar (criar objetos)
carro_A = Veiculo("Tesla", "Model X")
carro_B = Veiculo("BMW", "M3")

# 2. Execução
carro_A.acelerar()  # 10
carro_A.acelerar()  # 20
carro_B.acelerar()  # 10
carro_B.travar()    # 5
carro_B.travar()    # 0 (Regra de Negócio!)
carro_B.travar()    # 0 (Continua a 0)

# 3. Imprimir Resultado
print("Veículo A (" + carro_A.modelo + "): Velocidade Final =", carro_A.velocidade_atual)  # Output: 20
print("Veículo B (" + carro_B.modelo + "): Velocidade Final =", carro_B.velocidade_atual)  # Output: 0
