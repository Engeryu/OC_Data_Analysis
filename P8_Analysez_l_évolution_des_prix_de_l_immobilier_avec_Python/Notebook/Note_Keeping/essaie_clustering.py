histo_cluster = histo_m2[['code_postal', 'prix_m2', 'type_local']]
X = histo_cluster.drop(['type_local'], axis=1)
y = histo_cluster['type_local']
mapping = {'Local industriel. commercial ou assimilé': 0, 'Appartement': 1}
y = np.vectorize(mapping.get)(y)
y = pd.Series(y).astype('category')
display(y.dtype)

X_predict = sample_pred.drop(['valeur_fonciere', 'surface_reelle', 'nom_commune'], axis=1)

display(X.info())
display(X_predict.info())
print(f'Le prix moyen du mètre carré de l\'échantillon de test est de : {X_predict.prix_m2.mean()} €/m2')

# %% [markdown]
'''
##### 1.2. Normalisation des données :
'''
X_train, X_test, y_train, y_test = tts(X, y, test_size=0.33, random_state=0)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# %% [markdown]
'''
Nous observons dans les données que nous avons des valeurs différentes de prix au mètre carré pour un même arrondissement (ici le 19ème arrondissement). Il se peut fort que cela soit notre dimension à utiliser pour attribuer les prix au mètre carré les plus élevé dans un département aux locaux commerciaux, et les prix les plus bas aux appartements.
Pour effectuer cette opération, nous allons utiliser l'algorithme du Kmeans qui va rechercher 2 centroïdes à travers les données.
### 3. Séparation et attribution des valeurs prédites de l'échantillon :
'''
models = [
    KMeans(n_clusters=2, n_init=10, random_state=0),
    LogisticRegression(random_state=0),
    DecisionTreeClassifier(random_state=0),
    rfC(random_state=0),
    knnC(),
    SVC(random_state=0)
]
model_names = ['KMeans', 'Logistic Regression', 'Decision Tree', 'Random Forest', 'knn', 'SVM']

results, trained_models, y_preds = train_and_evaluate_models(models, model_names, X_train, y_train, X_test, y_test, None, None)
for key, value in results.items():
    print(f"{key}: {len(value)}")
best_model, comparison_df = create_comparison_table(results)
display(comparison_df)

accuracy = []
comparison_fig = make_subplots(rows=1, cols=1, subplot_titles=['Première partie des prédictions par modèles', 'Seconde partie des prédictions par modèles'], vertical_spacing=0.075)

model_names = list(y_preds.keys())
for model_name in model_names:
    accuracy.append(results['Accuracy'][model_names.index(model_name)])
comparison_fig.add_trace(go.Bar(x=model_names, y=accuracy), row=1, col=1)
comparison_fig.update_layout(title='Exactitude des modèles', xaxis_title='Modèles', yaxis_title='Exactitude', width=1300, height=800)
comparison_fig.show()

# %%
mapping = {0: 'Local industriel. commercial ou assimilé', 1: 'Appartement'}
y_pred = np.vectorize(mapping.get)(y_pred)

display(y_pred.tolist())

# %%
score = accuracy_score(y_test, y_pred)
print(f"{modele.__class__.__name__} accuracy: {score:.2f}")

# Calculer la somme des carrés intra-cluster (WCSS)
wcss = modele.inertia_
print(f"WCSS: {wcss:.2f}")

# Calculer le score de silhouette
silhouette = silhouette_score(X_test_scaled, y_pred)
print(f"Silhouette score: {silhouette:.2f}")

# Calculer le coefficient de Calinski-Harabasz
calinski_harabasz = calinski_harabasz_score(X_test_scaled, y_pred)
print(f"Calinski-Harabasz score: {calinski_harabasz:.2f}")

#%% [markdown]
'''arrays = [X_train_scaled, X_test_scaled]
array_names = ['X_train_scaled', 'X_test_scaled']

display(len(X_train))
display(len(X_test))
display(len(y_train))

# Boucle sur les tableaux
for array, array_name in zip(arrays, array_names):
    # Calculer des statistiques descriptives
    stats = {
        'Mean': np.mean(array, axis=0),
        'Std': np.std(array, axis=0),
        'Min': np.min(array, axis=0),
        'Max': np.max(array, axis=0),
        '25th percentile': np.percentile(array, 25, axis=0),
        'Median': np.median(array, axis=0),
        '75th percentile': np.percentile(array, 75, axis=0),
    }

    # Afficher les résultats
    print(f"{array_name}:")
    for stat_name, stat_value in stats.items():
        print(f"{stat_name}: {stat_value}")
    print()

# Entraîner et évaluer chaque modèle
for model, model_name in zip(models, model_names):
    # Entraîner le modèle
    model.fit(X_train_scaled, y_test)
    
# Prédire les étiquettes de X_test_scaled
    y_pred = model.predict(X_test_scaled)
    
    y_pred = np.where(y_pred == 0, 'Local industriel. commercial ou assimilé', y_pred)
    y_pred = np.where(y_pred == 1, 'Appartement', y_pred)

    
    # Évaluer le modèle
    score = accuracy_score(y_test, y_pred)
    print(f"{model_name} accuracy: {score:.2f}")'''

# %% [markdown]

'''
#### 1.2. Initialisation de la boucle de séléction des modèles de prédiction :
'''
data = {}
for model_name, model in trained_models.items():
    y_pred = model.predict(X_predict)
    data[f'{model_name}_pred'] = y_pred

# %% [markdown]
'''
#### 1.3. création un dictionnaire contenant les prédictions de chaque modèle
'''
for model_name, y_pred in data.items():
    print(f'Nombre de valeurs prédites pour le modèle {model_name}:')
    # Convertir les étiquettes numériques en étiquettes textuelles
    y_pred = np.vectorize(mapping.get)(y_pred)
    print(len(y_pred))

# %% [markdown]
'''
#### 1.4. Ajouter les prédictions de chaque modèle en tant que nouvelles colonnes du DataFrame
'''
for column_name, column_data in data.items():
    sample_pred = sample_pred.assign(**{column_name: column_data})

# Afficher les premières lignes du DataFrame mis à jour
display(sample_pred)

# %%
y_pred = KMeans.predict(X_test_scaled, y_train)

sample_pred['type_local'] = y_pred

# Évaluation des performances du modèle
ct = pd.crosstab(sample_pred.type_local, y_train)
ct.index.name = 'Cluster'
ct.columns.name = 'Type local'
ct

# %% [markdown]
'''
Nous avons obtenu notre prédiction. Nous pouvons changer les labels et remplacer les valeurs à 0 par Local industriel. commercial ou assimilé et les valeurs à +1 par Appartement. 
'''
sample_pred['type_local'] = sample_pred['type_local'].replace({0: 'Local industriel. commercial ou assimilé', 1: 'Appartement'})
# On vérifie les données de la prédiction
display(sample_pred.info())
display(sample_pred.head(10))
display(sample_pred.type_local.value_counts())

# %% [markdown]
'''
#### 3.2. Affichage sur graphique de la somme de la variable quantitative "Valeur foncière", sur la base de la variable qualitative "type_local" :
'''
aliases = {'Local industriel. commercial ou assimilé': 'Corporate'} # Create a dictionary of aliases
# Create the data for the bar chart, replacing the original value with its alias

unique_type_local = np.sort(sample_pred.type_local.unique()).tolist()
display_type_local = [aliases.get(type_local, type_local) for type_local in unique_type_local]
data = {'Type de bien': display_type_local,
        'Valeur foncière prédite': [sample_pred.loc[sample_pred['type_local'] == type_local]['valeur_fonciere'].sum() for type_local in unique_type_local]}
df = pd.DataFrame(data)

# Create a bar chart using plotly express
fig = px.bar(df, x='Type de bien', y='Valeur foncière prédite', color='Type de bien', color_discrete_sequence=['red', 'blue'], height=600, width=600)
fig.show()

# %% [markdown]
fig = px.box(sample_pred, x='type_local', y='prix_m2', color='type_local', title='Prix au m² pour chaque type de bien',
labels={'prix_m2': 'Montant moyen du metre carré des biens'}, height=600, width=750)
fig.update_xaxes(title_text='Type de bien')
fig.show()