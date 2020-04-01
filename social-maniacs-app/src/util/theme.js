export default {
    palette: {
        primary: {
          light: '#D2C9D5',
          main: '#512b58',
          dark: '#633a82',
          contrastText: '#dee3e2'
        },
        secondary: {
          light: '#79bac1',
          main: '#512b58',
          dark: '#fff591',
          contrastText: '#dee3e2'
        }
      },

      spreadThis: {
        typography: {
          useNextVariants: true
        },
        form : {
          textAlign: 'center'
        },
        image: {
            margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '10px auto 20px auto'
        },
        textField: {
            margin: '10px auto 20px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        customError: {
            color: '#ff0000',
            fontSize: "0.8rem",
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        },
      invisibleSeparator : {
        border: 'none',
        margin: 4 
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
      '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
      },
      '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
              verticalAlign: 'middle'
          },
          '& a': {
              color: '#D2C9D5'
          }
      },
      '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
      },
      '& svg.button': {
          '&:hover': {
              cursor: 'pointer'
          }
      }
    }
  }
}   
