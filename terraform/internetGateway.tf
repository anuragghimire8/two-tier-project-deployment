resource "aws_internet_gateway" "gw" {
    vpc_id = aws_vpc.vpc1.id
    tags = {
        Name = "public-gw"
    }
}