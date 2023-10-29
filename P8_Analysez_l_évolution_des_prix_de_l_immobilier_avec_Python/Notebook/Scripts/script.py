import os
os.environ['OMP_NUM_THREADS'] = '1'
# Bibliothèques générales
import pandas as pd, numpy as np, datetime as dt, time
from pandas.api.types import CategoricalDtype
from IPython.display import display
# Bibliothèques de visualisation
from plotly.subplots import make_subplots
import plotly.express as px, plotly.graph_objects as go, matplotlib.pyplot as plt
import networkx as nx
import plotly.figure_factory as ff
from dash import dash, dcc, html
from dash.dependencies import Input, Output
import seaborn as sns
# Bibliothèques mathématiques et statistiques
import statsmodels.api as sm, sympy as smp
import statsmodels.api as sm
from statsmodels.formula.api import ols
from sympy import symbols, Eq, Sum, Function, MatrixSymbol, Derivative
from scipy import stats as st
from scipy.misc import derivative
from scipy.stats import pearsonr, spearmanr, chi2_contingency
# Bibliothèques Scikit-learn
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split as tts
from sklearn.linear_model import LinearRegression as lR, Lasso as l1, Ridge as l2 ,SGDRegressor as sgdR
from sklearn.metrics import accuracy_score
from sklearn.neighbors import KNeighborsRegressor as knnR, KNeighborsClassifier as knnC
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestRegressor as rfR, GradientBoostingRegressor as gbR, RandomForestClassifier as rfC

# 1.1.1 Fonction retournant les informations principales d'un jeu de donnée (Dimensions, premières lignes, types de données) :
def get_table_info(df, table_name, n=5):
    # Display the dimensions of the table
    print(f"The table {table_name} has {df.shape[1]} column(s) and {df.shape[0]} observation(s) or article(s).\n")
    # Display the first n rows of the DataFrame
    print(f"Here are the first {n} rows of the table {table_name}:")
    display(df.head(n))
    # Display information about the DataFrame
    print(f"Here is the information about the table {table_name}:")
    df.info()

# 1.1.2 Fonction d'analyze d'un dataframe, de ses lignes et de ses valeurs dupliquées ou vides :
def analyze_dataframe(df, table_name, columns=None, distinct=None):
    # Formatage d'une chaîne de caractère avec condition via opérateur ternaire afin de vérifier et compter les lignes dupliquées et les cellules vides :
    get_info = lambda duplicated_rows, null_cells: (f"il se trouve {duplicated_rows} lignes dupliquées, " if duplicated_rows > 0 else "aucune ligne n'est dupliquée, ") + (f"et il se trouve {null_cells} cellules nulles.\n" if null_cells > 0 else "aucune cellule n'est vide.\n")
    text = f"Dans la table {table_name}, {get_info(sum(df.duplicated()), sum(df.isnull().any()))}"
    # L'argument columns effectue une itération sur chaque colonne spécifié si l'argument est appelé
    if columns is not None:
        for column in columns:
            duplicated_values = sum(df.duplicated(column))
            non_null_duplicated_values = sum(df.duplicated(column) & df[column].notnull())
            null_values = df[column].isnull().sum()
            # Formatage d'une chaîne de caractère avec condition via un opérateur ternaire afin de vérifier et compter les valeurs dupliquées et/ou nulles
            text += f"Dans la colonne {column}, "
            text += f"il se trouve {duplicated_values} valeurs dupliquées, dont {non_null_duplicated_values} valeurs non-nulles.\n" if duplicated_values > 0 else  f"il ne se trouve pas de valeur dupliquée. Le nombre d'articles correspond au nombre de lignes.\n"
            text += f"et {null_values} valeurs nulles.\nIl s'y trouve donc {df[column].nunique()} valeurs distinctes sur {df.shape[0]} lignes.\n" if null_values > 0 and duplicated_values > 0 else ""
    # Retour des valeurs distinctes des colonnes appelées
    if distinct is not None:
        for dist_col in distinct:
            unique_values = df[dist_col].unique()
            unique_values_str = list(map(str, unique_values))
            unique_values_text = ', '.join(unique_values_str)
            text += f"Dans la colonne {dist_col}, il se trouve {df[dist_col].nunique()} valeurs distinctes, que sont : {unique_values_text}.\n"
    print(text)

# 1.2. Fonction créant un nouveau tableau de donnée à partir d'un jeu de donnée (par les optionnels choix de trie selon des colonnes spécifiques, l'extraction de colonnes, ou de groupement) :
def request_analyze_graph(df_name, nom_csv=None, filters=None, data_columns=None, group_by_date=True):
    # Générer et afficher une phrase contenant les arguments et les paramètres passés à la fonction
    text = f'Appel de la fonction request_analyze_graph avec les arguments suivants :\n'
    text += f'    nom_csv: {nom_csv}\n'
    
    # Filtrer le DataFrame en fonction des valeurs choisies pour 'filters'
    if filters:
        query_parts = []
        query_params = {}
        for i, (col, val) in enumerate(filters.items()):
            param_name = f'val_{i}'
            if isinstance(val, list):
                query_parts.append(f'{col} in @{param_name}')
            else:
                query_parts.append(f'{col} == @{param_name}')
            query_params[param_name] = val
        query_string = ' & '.join(query_parts)
        filtered_df = df_name.query(query_string, local_dict=query_params)
        text += f'    filters: {filters}\n'
    else:
        filtered_df = df_name.copy()
    
    # Regrouper les données par année si demandé
    if group_by_date:
        text += f'    group_by_date: {group_by_date}\n'
        if data_columns is not None:
            filtered_df = filtered_df.groupby(filtered_df['year_mutation']).agg({col: 'mean' for col in data_columns})
        else:
            filtered_df = filtered_df.groupby(filtered_df['year_mutation']).mean()
    
    # Extraire les colonnes spécifiées
    if data_columns is not None:
        text += f'    Les colonnes extraites sont : {data_columns}\n'
        filtered_df = filtered_df[list(data_columns)]
    
    print(text) # Afficher le texte généré
    
    return filtered_df

def convert_columns_inplace(df, conversions):
    for col, new_type in conversions.items():
        if col in df.columns:  # Vérifiez si la colonne existe
            if new_type == "ordinal":
                df[col] = df[col].apply(lambda date: np.uint32(date.toordinal()))
            elif new_type == "category":
                df[col] = df[col].astype(CategoricalDtype())
            else:
                df[col] = df[col].astype(new_type)

# 1.3.1 Fonction de conversion automatique à partir d'un dictionnaire :
def convert_columns(df, conversions):
    common_cols = set(df.columns) & set(conversions.keys())
    # Vérifier que les colonnes spécifiées dans le dictionnaire 'conversions' existent bien dans le DataFrame avant de les convertir
    for col in common_cols:
        if col in df.columns:
            df = df.astype({col: conversions[col]})
    return df

# 1.3.2. Fonction de conversion des variables d'entraînements :
def prepare_df_model(df, new_df_name, data, dummies):
    new_df = df.copy()
    new_df = new_df[data]
    new_df = pd.get_dummies(new_df, columns=dummies)
    return new_df

# 1.4.1. Fonction de préparation à la prédiction, de la visualisation graphique et des résultats :
def evaluate_model(model, X_train, y_train, X_test):
    model.fit(X_train,y_train)
    y_pred = model.predict(X_test)
    return y_pred

# 1.4.2. Fonction d'execution des différents modèles de regression/classification et d'évaluation des résultats sur tableau de donnée :
def train_and_evaluate_models(models, model_names, X_train, y_train, X_test, y_test, n_neighbors_values, alpha_values):
    if isinstance(y_test.dtype, pd.api.types.CategoricalDtype):
        results = {'Modèle': [], 'n_neighbors': [], 'alpha': [], 'Temps d\'exécution (secondes)': [], 'Accuracy': []}
    else:
        results = {'Modèle': [], 'n_neighbors': [], 'alpha': [], 'Temps d\'exécution (secondes)': [], 'MAPE': []}
    trained_models = {}
    y_preds = {}
    hyperparam_index = 0
    for model, model_name in zip(models,model_names):
        y_preds[model_name] = []
        if isinstance(model,knnR):
            if n_neighbors_values is not None:
                for n_neighbors in n_neighbors_values:
                    model.set_params(n_neighbors=n_neighbors)
                    start_time = time.time()
                    y_pred = evaluate_model(model,X_train,y_train,X_test)
                    end_time = time.time()
                    record_results(model,results,y_test,y_pred,start_time,end_time,n_neighbors=n_neighbors)
                    y_preds[model_name].append(y_pred)
                    hyperparam_index += 1
        elif isinstance(model,l1):
            if alpha_values is not None:
                for alpha in alpha_values:
                    model.set_params(alpha=alpha)
                    start_time = time.time()
                    y_pred = evaluate_model(model,X_train,y_train,X_test)
                    end_time = time.time()
                    record_results(model,results,y_test,y_pred,start_time,end_time,alpha=alpha)
                    y_preds[model_name].append(y_pred)
                    hyperparam_index += 1
        elif isinstance(model,l2):
            if alpha_values is not None:
                for alpha in alpha_values:
                    model.set_params(alpha=alpha)
                    start_time = time.time()
                    y_pred = evaluate_model(model,X_train,y_train,X_test)
                    end_time = time.time()
                    record_results(model,results,y_test,y_pred,start_time,end_time,alpha=alpha)
                    y_preds[model_name].append(y_pred)
                    hyperparam_index += 1
        else:
            start_time = time.time()
            y_pred = evaluate_model(model,X_train,y_train,X_test)
            end_time = time.time()
            record_results(model,results,y_test,y_pred,start_time,end_time)
            y_preds[model_name].append(y_pred)
        trained_models[model_name] = model
    return results, trained_models, y_preds

# 1.4.3 Fonction de sauvegarde des résultats et du score de modèle :
def record_results(model, results, y_test, y_pred, start_time, end_time, n_neighbors=None, alpha=None):
    execution_time = end_time - start_time
    if isinstance(y_test.dtype, pd.api.types.CategoricalDtype):
        error = accuracy_score(y_test, y_pred)
        error_name = 'Accuracy'
    else:
        error = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
        error_name = 'MAPE'
    results['Modèle'].append(model.__class__.__name__)
    results['n_neighbors'].append(n_neighbors)
    results['alpha'].append(alpha)
    results['Temps d\'exécution (secondes)'].append(execution_time)
    results[error_name].append(error)


# 1.4.4 Fonction de répartition des résultats sur tableau de donnée :
def create_comparison_table(results):
    comparison_df = pd.DataFrame(results).dropna(axis=1, how='all')
    float_cols = [col for col in comparison_df.columns if comparison_df[col].dtype == 'float']
    comparison_df[float_cols] = comparison_df[float_cols].round(2)

    error_cols = [col for col in comparison_df.columns if col not in ['Modèle', 'n_neighbors', 'alpha', 'Temps d\'exécution (secondes)']]
    sort_by = error_cols[0]
    
    if sort_by == 'Accuracy':
        comparison_df.sort_values(by=sort_by, ascending=False, inplace=True)
        best_model_index = comparison_df[sort_by].idxmax()
    else:
        comparison_df.sort_values(by=sort_by, inplace=True)
        best_model_index = comparison_df[sort_by].idxmin()
    
    pd.options.display.float_format = '{:.2f}'.format
    best_model = comparison_df.loc[best_model_index, 'Modèle']
    print(f'Le meilleur modèle est {best_model} avec un score {sort_by} de {comparison_df.loc[best_model_index, sort_by]:.2f}%')    
    return best_model, comparison_df