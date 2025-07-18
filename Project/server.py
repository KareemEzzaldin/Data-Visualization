from flask import Flask, jsonify, render_template
import pandas as pd

df = pd.read_csv("Cars_Factor.csv").head(20)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-datachart')
def get_datachart():
    classes = df["CarName"].value_counts().index
    values = df["CarName"].value_counts().values
    
    data = []
    for i in range(len(classes)):
        data.append({"class": classes[i], "value": int(values[i])})
    return jsonify(data)

@app.route('/get-datachart2')
def get_datachart2():
    classes2 = df['fueltype'].value_counts().index
    values2 = df['citympg'].value_counts().values
    values22 = df['highwaympg'].value_counts().values

    data = []
    for i in range(len(classes2)):
        data.append({"class2":classes2[i], "value2":int(values2[i]), "value22":int(values2[i])})

    return jsonify(data)

@app.route('/get-datachart3')
def get_datachart3():
    classes3 = df["enginetype"].value_counts().index
    values3 = df['horsepower'].value_counts().values
    
    data = []
    for i in range(len(classes3)):
        data.append({"class3": classes3[i], "value3": int(values3[i])})

    return jsonify(data)

@app.route('/get-datachart4')
def get_datachart4():
    classes4 = df["cylindernumber"].value_counts().index
    values4 = df["horsepower"].value_counts().values
    
    data = []
    for i in range(len(classes4)):
        data.append({"class4": classes4[i], "value4": int(values4[i])})
    return jsonify(data)


@app.route('/get-datachart5')
def get_datachart5():
    classes5 = df["CarName"].value_counts().index
    values5 = df["price"].value_counts().values
    
    data = []
    for i in range(len(classes5)):
        data.append({"class5": classes5[i], "value5": int(values5[i])})
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

