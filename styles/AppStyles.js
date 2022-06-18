import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  noPadding: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red"
  },
  rowContainer: {
    width: "90%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
    // marginTop: 40,
    marginBottom: 20
  },
  k: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    // marginVertical: 4,
    // marginTop: 20,
    marginBottom: 5,
    marginRight: 20,
    backgroundColor: '#85afba'
  },
  rowContainer2: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    // marginVertical: 4,
    // marginTop: 20,
    marginBottom: 5,
    marginRight: 20,
    backgroundColor: '#0063B2FF'
  },
  
  fillSpace: {
    flex: 0.8
  },
  rightAligned: {
    justifyContent: "flex-end"
  },
  topMargin: {
    // marginTop: 16
  },
  bottomMargin: {
    marginBottom: 16
  },
  rightMargin: {
    marginRight: 10
  },
  leftMargin: {
    // marginLeft: 10
  },
  backgroundCover: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.7,
    padding: 16
  },
  lightText: {
    color: "#fff"
  },
  errorText: {
    color: "#ff0000"
  },
  header: {
    fontSize: 40,
    alignSelf: "center",
    // marginTop: 30
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8, 
    maxWidth: "100%",
    borderWidth: 2
  },
  lightTextInput: {
    borderBottomColor: "#ffffff"
  },
  darkTextInput: {
    borderBottomColor: "#000000",
    height: "80%",
    textAlignVertical: 'top'
  },
  inlineTextButton: {
    color: "#0063B2FF",
    fontSize: 20,
    // color: 'white',
    marginRight:10
    // backgroundColor: 'red'
  },
  pressedInlineTextButton: {
    color: "#0063B2FF",
    opacity: 0.6,
    fontWeight: 'bold',
  },
  passwordInput:{
    borderBottomColor: "#000000",
    height: "10%",
    textAlignVertical: 'top'
  }
});