using System;

namespace API.DTOs
{
    public class DocDto
    {
        public string FileName { get; set; }

        public string FileHeader { get; set; }

        public string FileData { get; set; }

        public int FileSize { get; set; }

        public string UploadTime { get; set; }
    }
}