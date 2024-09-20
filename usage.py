import stompws
from dash import Dash, callback, html, Input, Output, State

app = Dash(__name__)

app.layout = html.Div([
    stompws.STOMPWebsocket(
        url="ws://127.0.0.1:15674/ws",
        subscribe="/topic/test",
        id="ws",
    ),
    html.Button('Send', id='send'),
    html.Button('Sub', id='sub'),
    html.Button('Sub sample', id='sub-sample'),
    html.Button('UnSub', id='unsub'),
    html.Button('ReSub', id='resub'),
    html.Div(id='output'),
])

@callback(Output('ws', 'subscribe', allow_duplicate=True), Input('sub', 'n_clicks'), prevent_initial_call=True)
def subscribe(value):
    return "/topic/test"

@callback(Output('ws', 'subscribe', allow_duplicate=True), Input('sub-sample', 'n_clicks'), prevent_initial_call=True)
def subscribe2(value):
    return "/topic/sample"

@callback(Output('ws', 'unsubscribe', allow_duplicate=True), Input('unsub', 'n_clicks'), State("ws", "subscribe"), prevent_initial_call=True)
def unsubscribe(value, topic):
    return topic

@callback(Output('ws', 'send'), Input('send', 'n_clicks'), prevent_initial_call=True)
def send(value):
    return {
        "destination": "/topic/test",
        "body": "Hello dash",
    }

@callback(Output('ws', 'subscribe', allow_duplicate=True), Output('ws', 'unsubscribe', allow_duplicate=True), Input('resub', 'n_clicks'), prevent_initial_call=True)
def send(value):
    return "/topic/sample", "/topic/test"

@callback(Output('output', 'children'), Input('ws', 'message'), State("output", "children"))
def display_output(message, children):
    children = children or []
    children.append(html.P(message))
    return children


if __name__ == '__main__':
    app.run_server(debug=True)
