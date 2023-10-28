const exec = require('child_process').exec

const reqc = `curl --location --request GET 'https://siap.undip.ac.id/irs/mhs/irs/ajax_irs_data/table' \
--header 'Content-Type: text/plain' \
--header 'Cookie: sia_app_session=f6vvlrr3r97opr73qgdmut18qbub6j5q' \
--data-raw 'include_makul%5B36906%5D=36906&include_makul%5B40694%5D=40694&include_makul%5B40695%5D=40695&include_makul%5B40696%5D=40696&include_makul%5B40698%5D=40698&include_makul%5B40700%5D=40700&include_makul%5B40743%5D=40743&include_makul%5B40747%5D=40747&include_makul%5B41179%5D=41179&requested_makul%5B40694%5D=40694&requested_makul%5B40695%5D=40695&requested_makul%5B40696%5D=40696&requested_makul%5B40698%5D=40698&requested_makul%5B40700%5D=40700&requested_makul%5B40747%5D=40747&requested_makul%5B41179%5D=41179'`

exec(reqc, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout.match('PAIK6504'))
})
