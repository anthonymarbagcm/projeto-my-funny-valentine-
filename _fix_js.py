with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Corrigir backticks escapados incorretamente (\` -> `) dentro de strings normais
content = content.replace('\\`', '`')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Backticks corrigidos')
print('Ocorrências de \\\\` restantes:', content.count('\\\\`'))
print('Ocorrências de \\` restantes:', content.count('\\`'))