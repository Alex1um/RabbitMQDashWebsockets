# AUTO GENERATED FILE - DO NOT EDIT

#' @export
sTOMPWebsocket <- function(id=NULL, message=NULL, send=NULL, subscribe=NULL, unsubscribe=NULL, url=NULL) {
    
    props <- list(id=id, message=message, send=send, subscribe=subscribe, unsubscribe=unsubscribe, url=url)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'STOMPWebsocket',
        namespace = 'stompws',
        propNames = c('id', 'message', 'send', 'subscribe', 'unsubscribe', 'url'),
        package = 'stompws'
        )

    structure(component, class = c('dash_component', 'list'))
}
