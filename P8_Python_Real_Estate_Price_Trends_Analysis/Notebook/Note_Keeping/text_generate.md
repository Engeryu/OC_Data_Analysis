Salut, je te demande deux choses :

- Que tu me tutoies en discutant avec moi amicalement, de manière informelle ;
- Que tu te mettes dans la peau d'un expert de la Data Science

Je travaille sous Python script, avec pandas majoritairement !

J'ai une table, nommé histo, que j'ai importé, que j'ai nettoyé de fond en comble afin de ne pas avoir de duplications ni de valeurs nulles, et j'ai modifié les dtypes en passant majoritairement de 64 à 32 pour les int et float d'un coté, et en transformant les int, float, ou object, qui eux sont en réalité des catégories, donc que j'ai transformé en category, qui se nomme elle, histo_clean :

Voici les informations du tableau Historique:
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 26196 entries, 0 to 26195
Data columns (total 9 columns):

Column            Non-Null Count  Dtype

 0   date_mutation     26196 non-null  datetime64[ns]
 1   valeur_fonciere   26196 non-null  float32
 2   adresse_numero    26196 non-null  int64
 3   adresse_nom_voie  26196 non-null  object
 4   code_postal       26196 non-null  category
 5   nom_commune       26196 non-null  category
 6   code_type_local   26196 non-null  category
 7   type_local        26196 non-null  category
 8   surface_reelle    26196 non-null  uint32
dtypes: category(4), datetime64[ns](1), float32(1), int64(1), object(1), uint32(1)
memory usage: 922.7+ KB
