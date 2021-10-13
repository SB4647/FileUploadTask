using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers{ 

    [ApiController]
    [Route("api/[controller]")]

    public class DocumentController : ControllerBase
    {
        //fiels 
        private readonly DataContext _context;

        public DocumentController(DataContext context)
        {
            _context = context;
        }

        //Upload end-point
        //Recieves request containing uploaded file data and saves to database if it hasn't already been uploaded
        //Responds with updated database data
        [HttpPost("upload")]
        public async Task<ActionResult<DocDto>> Upload(UploadDto uploadDto)
        {
            var doc = new DocDto
            {
                FileName = uploadDto.FileName
            };

            // Check if DocDto exists in dbContext
            if (await DocExists(doc)) return BadRequest("File has already been uploaded.");

            // Create AppBlob to load into dbContext
            var upload = new AppBlob
            {
                FileName = uploadDto.FileName,
                FileHeader = uploadDto.FileHeader,
                //convert FileData string to byte array
                FileData = Convert.FromBase64String(uploadDto.FileData),
                FileSize = uploadDto.FileSize,
            };

            // Sync dbContext
            _context.Blob.Add(upload);

            //save data in database
            await _context.SaveChangesAsync();


            // Return doc
            return doc;
        }

        //List End-point
        //Recieves request and responds to client extracts all database data.
        //Responds with a JSON array of objects containing data for each individual file.
        [HttpGet("list")]
        public async Task<ActionResult> List()
        {
            // Get all data in dbContext 
            var readDb = await _context.Blob
                .ToListAsync();

            // Get stored database data for each file  
            var response = readDb.Select(
                file => new DocDto
                {
                    FileName = file.FileName,
                    FileHeader = file.FileHeader,
                    //convert FileData byte array to string
                    FileData = Convert.ToBase64String(file.FileData),
                    FileSize = file.FileSize,
                    //convert DateTime to string
                    UploadTime = file.UploadTime.ToString(),

                });

            // Return response
            return Ok(response);
        }

        //Read endpoint
        //Allows client to download files
        [HttpPost("read")]
        public async Task<ActionResult<UploadDto>> Read(DocDto doc)
        {
            // Check if DocDto exists in dbContext
            if (!await DocExists(doc)) return BadRequest("File does not exist.");
            // Read AppBlob from dbContext
            var readDb = await _context.Blob
                .FirstOrDefaultAsync(x => x.FileName == doc.FileName);


            var readJson = new UploadDto
            {
                FileName = readDb.FileName,
                FileData = Convert.ToBase64String(readDb.FileData),
                FileHeader = readDb.FileHeader,
   
            };

            // Return doc
            return readJson;
        }


        //method used to check if file has already been uploaded
        private async Task<bool> DocExists(DocDto uploadDto)
        {
            bool FileExists = await _context.Blob.AnyAsync(ECKeyXmlFormat => 
                ECKeyXmlFormat.FileName == uploadDto.FileName);
            return FileExists;
        }

    }
}