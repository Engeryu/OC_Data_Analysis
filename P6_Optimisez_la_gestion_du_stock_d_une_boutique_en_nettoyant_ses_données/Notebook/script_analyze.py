
def analyze_dataframe(df, table_name, columns=None, distinct=None, sum_count=None):
    text = (f"Le tableau {table_name} comporte {df.shape[1]} colonne(s) et {df.shape[0]} observation(s) ou article(s).\n") # Affichage des dimensions de la table
    print(f"Voici les 5 premières lignes du tableau {table_name}:") # Affichage des 5 premières lignes du DataFrame
    print(df.head())
    print(f"Voici les informations du tableau {table_name}:") # Affichage des informations sur le DataFrame
    print(df.info())
# Formatage d'une string avec opérateur ternaire via lambda afin de vérifier et compter les lignes dupliquées et les cellules vides 
    get_info = lambda duplicated_rows, null_cells: (f"il se trouve {duplicated_rows} lignes dupliquées, " if duplicated_rows > 0 else "aucune ligne n'est dupliquée, ") + (f"et il se trouve {null_cells} cellules nulles.\n" if null_cells > 0 else "aucune cellule n'est vide.\n")
    text += f"Dans la table {table_name}, {get_info(sum(df.duplicated()), sum(df.isnull().any()))}"
# L'argument columns effectue une itération sur chaque colonne spécifié si l'argument est appelé
    if columns is not None:
        for column in columns:
            duplicated_values = sum(df.duplicated(column))
            non_null_duplicated_values = sum(df.duplicated(column) & df[column].notnull())
            null_values = df[column].isnull().sum()
# Formatage d'une string avec opérateur ternaire via lambda afin de vérifier et compter les valeurs dupliquées et/ou nulles. 
            text += f"Dans la colonne {column}, "
            text += f"il se trouve {duplicated_values} valeurs dupliquées, dont {non_null_duplicated_values} valeurs non-nulles " if duplicated_values > 0 else  f"il ne se trouve pas de valeur dupliquée. Le nombre d'articles correspond au nombre de lignes.\n"
            text += f"et {null_values} valeurs nulles.\nIl s'y trouve donc {df[column].nunique()} valeurs distinctes sur {df.shape[0]} lignes.\n" if null_values > 0 and duplicated_values > 0 else ""

    if distinct is not None:
        unique_values = df[distinct].unique()
        unique_values_str = list(map(str, unique_values))
        unique_values_text = ', '.join(unique_values_str)
        text += f"Dans la colonne {distinct}, il se trouve {df[distinct].nunique()} valeurs distinctes, que sont : {unique_values_text}.\n"
# L'argument sum_count calcul le nombre total d'articles si l'argument est appelé
    if sum_count is not None:
        text += f"Les produits figurants sur le site web se dénombrent à {df[sum_count].sum()}, parmi les {df[sum_count].count()} articles enregistrés.\n{len(df) - df[sum_count].sum()} articles ne sont donc pas mis en ventes\n"
    
    print(text)


