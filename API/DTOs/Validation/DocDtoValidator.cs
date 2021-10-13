using API.DTOs;
using FluentValidation;

namespace Application.Activities
{
    //class used to validate uploaded file data 
    public class DocDtoValidator : AbstractValidator<DocDto>
    {
        public DocDtoValidator()
        {
            RuleFor(x => x.FileName).NotEmpty();
            RuleFor(x => x.FileHeader).NotEmpty();
            RuleFor(x => x.FileData).NotEmpty();
            RuleFor(x => x.FileSize).NotEmpty();

        }
    }
}